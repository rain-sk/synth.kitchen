#!/usr/bin/env bash

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

kill_tree() {
    local pid=$1 sig=${2:-TERM} depth=${3:-0}
    [ "$depth" -gt 6 ] && return
    local child
    for child in $(pgrep -P "$pid" 2>/dev/null); do
        kill_tree "$child" "$sig" $((depth + 1))
    done
    kill -"$sig" "$pid" 2>/dev/null || true
}

cleanup() {
    if [[ -n "$dev_pid" ]]; then
        if [[ -n "${dev_pgid:-}" ]]; then
            kill -KILL -"$dev_pgid" 2>/dev/null || true
        fi
        kill_tree "$dev_pid" KILL

        local port tries stable
        for port in "${port:-}" "${api_port:-}"; do
            [ -n "$port" ] || continue
            tries=0
            stable=0
            while [ "$stable" -lt 2 ]; do
                if lsof -ti "tcp:$port" -sTCP:LISTEN >/dev/null 2>&1; then
                    lsof -ti "tcp:$port" -sTCP:LISTEN 2>/dev/null | xargs kill -KILL 2>/dev/null || true
                    stable=0
                    tries=$((tries + 1))
                    [ "$tries" -ge 12 ] && break
                else
                    stable=$((stable + 1))
                fi
                sleep 0.5
            done
        done

        dev_pid=""
    fi
}
trap cleanup EXIT INT TERM

if [ "${E2E_FRESH_DB:-0}" = "1" ]; then
    echo "e2e.sh: E2E_FRESH_DB=1 - dropping the sk-db-dev volume and rebuilding from migrations"
    "$ROOT/scripts/db.sh" reset
else
    echo "e2e.sh: reusing sk-db-dev; E2E_FRESH_DB=1 rebuilds it and proves the upgrade chain"
    "$ROOT/scripts/db.sh" up
    "$ROOT/scripts/db.sh" migrate
fi
"$ROOT/scripts/db.sh" sweep-e2e

find_port() {
    local port=$1
    while node -e '
        require("net")
            .createServer()
            .once("error", () => process.exit(0))
            .listen(Number(process.argv[1]), "0.0.0.0", function () {
                this.close(() => process.exit(1));
            });
    ' "$port" 2>/dev/null; do
        port=$((port + 1))
    done
    echo "$port"
}

port=$(find_port "${E2E_PORT:-8080}")
export VITE_PORT="$port"
export CYPRESS_BASE_URL="http://localhost:$port"
echo "e2e.sh: web on $port"

api_port=$(find_port "${API_PORT:-3000}")
export API_PORT="$api_port"
export VITE_API_ORIGIN="http://localhost:$api_port"
echo "e2e.sh: api on $api_port"

set -m

if [ "${DEV_E2E:-0}" = "1" ]; then
    echo "e2e.sh: DEV_E2E=1 - dev server, watchers and hmr live"
    npm run dev &
else
    echo "e2e.sh: serving the production build, no watchers and no hmr (DEV_E2E=1 for the dev server)"
    npm run build:e2e || {
        echo "e2e.sh: build failed" >&2
        exit 1
    }
    npm run serve:e2e &
fi
dev_pid=$!
dev_pgid=$(ps -o pgid= -p "$dev_pid" 2>/dev/null | tr -d ' ')
echo $dev_pid

tries=0
until [ "$(curl -sf "$CYPRESS_BASE_URL/api/health" 2>/dev/null)" = "OK" ]; do
    tries=$((tries + 1))
    if [ $tries -ge 90 ]; then
        echo "e2e.sh: no healthy api behind $CYPRESS_BASE_URL/api/health after ${tries}s" >&2
        exit 1
    fi
    sleep 1
done
echo "e2e.sh: stack healthy, running cypress"

wait_shared_build_quiet() {
	local SHARED_BUILD="$ROOT/app/shared/build/index.js" last="" stable=0 tries=0 now
	modified() {
		stat -f %m "$SHARED_BUILD" 2>/dev/null || stat -c %Y "$SHARED_BUILD" 2>/dev/null || echo ""
	}

	while [ "$stable" -lt 3 ]; do
		if [ ! -f "$SHARED_BUILD" ]; then
			echo "e2e.sh: waiting for $SHARED_BUILD to appear" >&2
		else
			now=$(modified)
			if [ -n "$now" ] && [ "$now" = "$last" ]; then
				stable=$((stable + 1))
			else
				stable=0
			fi
			last="$now"
		fi
		tries=$((tries + 1))
		if [ $tries -ge 90 ]; then
			echo "e2e.sh: $SHARED_BUILD still changing after 90s - starting anyway" >&2
			break
		fi
		sleep 1
	done
	echo "e2e.sh: shared build quiet for 3s, cypress may start"
}

if [ "${DEV_E2E:-0}" = "1" ]; then
	wait_shared_build_quiet
fi

npm run test:cypress
test_exit_code=$?

cleanup

exit $test_exit_code
