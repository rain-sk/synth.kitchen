#!/usr/bin/env bash

cleanup() {
    if [[ -n "$dev_pid" ]]; then
        kill -KILL "$dev_pid" 2>/dev/null || true
    
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