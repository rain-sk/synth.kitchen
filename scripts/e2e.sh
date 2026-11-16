#!/usr/bin/env bash
#

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cleanup() {
    if [[ -n "$dev_pid" ]]; then
        kill -TERM -$dev_pid 2>/dev/null || true

        sleep 1

        if ps -p "$dev_pid" > /dev/null 2>&1; then
            kill -KILL -$dev_pid 2>/dev/null || true
        fi

        pkill -f "npm run dev" 2>/dev/null || true

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
