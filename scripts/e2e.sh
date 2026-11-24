#!/usr/bin/env bash
#

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
        # kill our own tree, then whatever is still bound to the ports we allocated. The old
        # `pkill -f "npm run dev"` also matched a developer's separate `npm run dev` / `npm run dev:api`
        # and took their stack down; a plain tree kill on dev_pid left grandchildren (concurrently → tsx/vite)
        # holding the ports, so the next run silently moved up to 8086
        # the background job gets its own process group (see `set -m` at launch), and a PGID survives
        # re-parenting — concurrently has been seen orphaned to launchd (ppid 1) after npm run dev died,
        # which is why killing by process tree missed it and it went on respawning api/vite on our ports
        if [[ -n "${dev_pgid:-}" ]]; then
            kill -KILL -"$dev_pgid" 2>/dev/null || true
        fi
        kill_tree "$dev_pid" KILL

        # loop until the ports are free AND stay free. concurrently -k respawns a child it lost, and that
        # supervisor can outlive the first sweep, so a single momentary gap is not proof of release — the api
        # has been seen rebounding to 3001 after cleanup returned
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
    # the migration chain and the boot-time patch-state upgrade only ever run against a database that
    # does not exist yet, and migrate is a recorded no-op against one that does - so a broken migration
    # ships silently. This is the opt-in that proves the chain. It drops the volume, and with it any
    # patch made by hand in sk-db-dev
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
    while lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; do
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

# monitor mode puts the background job in its own process group, so cleanup can reap the whole stack by
# PGID — concurrently gets re-parented to launchd once npm run dev dies, which defeats pgrep -P
set -m

npm run dev &
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

# /api/health answers long before dev:shared finishes its first tsc --watch pass. If cypress starts in
# that window the watcher rewrites app/shared/build/index.js under a live page: the api restarts, vite
# reports "Could not Fast Refresh (PatchContext export is incompatible)" and remounts the editor mid-test,
# so the canvas resets and state the test just wrote disappears. Wait for the build file to go quiet.
SHARED_BUILD="$ROOT/app/shared/build/index.js"
modified() {
	stat -f %m "$SHARED_BUILD" 2>/dev/null || stat -c %Y "$SHARED_BUILD" 2>/dev/null || echo ""
}

last=""
stable=0
tries=0
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

npm run test:cypress
test_exit_code=$?

cleanup

exit $test_exit_code
