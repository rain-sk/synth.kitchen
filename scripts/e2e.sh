#!/usr/bin/env bash

cleanup() {
    if [[ -n "$dev_pid" ]]; then
        echo "Terminating dev server"
        kill -TERM "$dev_pid" 2>/dev/null || true

        sleep 1

        if ps -p "$dev_pid" > /dev/null 2>&1; then
            echo "Killing dev server"
            kill -KILL "$dev_pid" 2>/dev/null || true
        fi

        dev_pid=""
    fi
}
trap cleanup EXIT INT TERM

npm run dev &
dev_pid=$!
echo $dev_pid

sleep 2

npm run test
test_exit_code=$?

cleanup

exit $test_exit_code