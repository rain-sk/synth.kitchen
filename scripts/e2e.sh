#!/usr/bin/env bash
#

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

kill_tree() {
    local pid=$1 depth=${2:-0}
    [ "$depth" -gt 6 ] && return
    local child
    for child in $(pgrep -P "$pid" 2>/dev/null); do
        kill_tree "$child" $((depth + 1))
    done
    kill -TERM "$pid" 2>/dev/null || true
}

cleanup() {
    if [[ -n "$dev_pid" ]]; then
        # kill our own tree, then whatever is still bound to the ports we allocated. The old
        # `pkill -f "npm run dev"` also matched a developer's separate `npm run dev` / `npm run dev:api`
        # and took their stack down; a plain tree kill on dev_pid left grandchildren (concurrently → tsx/vite)
        # holding the ports, so the next run silently moved up to 8081/3001
        kill_tree "$dev_pid"

        local port
        for port in "${port:-}" "${api_port:-}"; do
            [ -n "$port" ] || continue
            lsof -ti "tcp:$port" -sTCP:LISTEN 2>/dev/null | xargs kill -TERM 2>/dev/null || true
        done

        sleep 1

        for port in "${port:-}" "${api_port:-}"; do
            [ -n "$port" ] || continue
            lsof -ti "tcp:$port" -sTCP:LISTEN 2>/dev/null | xargs kill -KILL 2>/dev/null || true
        done

        dev_pid=""
    fi
}
trap cleanup EXIT INT TERM

"$ROOT/scripts/db.sh" up
"$ROOT/scripts/db.sh" migrate

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

npm run dev &
dev_pid=$!
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

npm run test
test_exit_code=$?

cleanup

exit $test_exit_code
