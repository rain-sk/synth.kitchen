#!/usr/bin/env bash

ENV_FILE="$(dirname "$0")/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

MISSING=0

for VAR in REMOTE_USER REMOTE_HOST POSTGRES_IMAGE; do
  if [ -z "${!VAR}" ]; then
    echo "Missing required variable in .env: $VAR"
    MISSING=1
  fi
done

if [ "$MISSING" -eq 1 ]; then
  exit 1
fi

CONTAINER_ID=$(ssh "${REMOTE_USER}@${REMOTE_HOST}" "
  docker ps --filter 'ancestor=${POSTGRES_IMAGE}' --format '{{.ID}}'
")

if [ -z \"$CONTAINER_ID\" ]; then
  echo Error: No container found running image postgres:17-alpine.
  exit 1
fi

echo Postgres container ID: $CONTAINER_ID

LOCAL_IP=$(ssh "${REMOTE_USER}@${REMOTE_HOST}" "
  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_ID
")

if [ -z \"$LOCAL_IP\" ]; then
  echo Error: Could not retrieve local IP address of container $CONTAINER_ID at $REMOTE_HOST.
  exit 1
fi

echo Opening tunnel to postgres container \($LOCAL_IP\) on remote server.

ssh -N -L 5432:$LOCAL_IP:5432 $REMOTE_USER@$REMOTE_HOST
