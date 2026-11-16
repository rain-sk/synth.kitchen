#!/usr/bin/env bash
#
# Local dev database. Talks to the compose.yaml postgres only, never to
# sk-db. See docs/todo/next.md ("dev / staging / prod database setup").
#
# usage: ./scripts/db.sh up | down | reset | status | psql | migrate
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
API_ENV="$ROOT/app/api/.env"
PROJECT="synth-kitchen-dev"
SERVICE="db"

die() {
	echo "db.sh: $*" >&2
	exit 1
}

[ -f "$ENV_FILE" ] || die "no $ENV_FILE (copy values from .env.example)"

# app/api/.env is the source of truth: the api reads it via --env-file, so
# the container has to match it rather than the other way round.
sync_env() {
	[ -f "$API_ENV" ] || die "no $API_ENV (copy app/api/.env.example)"

	local api_db api_user api_pass api_host
	api_host=$(grep '^POSTGRES_HOST=' "$API_ENV" | cut -d= -f2- || true)
	api_db=$(grep '^POSTGRES_DB_NAME=' "$API_ENV" | cut -d= -f2- || true)
	api_user=$(grep '^POSTGRES_USERNAME=' "$API_ENV" | cut -d= -f2- || true)
	api_pass=$(grep '^POSTGRES_PASSWORD=' "$API_ENV" | cut -d= -f2- || true)

	[ -n "$api_host" ] || die "POSTGRES_HOST missing from $API_ENV"
	case "$api_host" in
	localhost | 127.0.0.1) ;;
	*)
		die "POSTGRES_HOST is '$api_host', not localhost. This script only manages a local database. Point app/api/.env at localhost, or run migrations against the remote host deliberately."
		;;
	esac

	[ -n "$api_db" ] || die "POSTGRES_DB_NAME missing from $API_ENV"
	[ -n "$api_user" ] || die "POSTGRES_USERNAME missing from $API_ENV"
	if [ -z "$api_pass" ]; then
		api_pass="$(head -c 24 /dev/urandom | base64 | tr -d '/+=' | head -c 24)"
		sed -i.bak "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$api_pass|" "$API_ENV"
		rm -f "$API_ENV.bak"
		echo "db.sh: generated a POSTGRES_PASSWORD in $API_ENV"
	fi

	# rewrite the local-db block in the root .env
	local tmp
	tmp="$(mktemp)"
	grep -v '^POSTGRES_DB_NAME=' "$ENV_FILE" | grep -v '^POSTGRES_USERNAME=' |
		grep -v '^POSTGRES_PASSWORD=' | grep -v '^POSTGRES_PORT=' >"$tmp" || true
	{
		echo "POSTGRES_DB_NAME=$api_db"
		echo "POSTGRES_USERNAME=$api_user"
		echo "POSTGRES_PASSWORD=$api_pass"
		echo "POSTGRES_PORT=${POSTGRES_PORT:-5432}"
	} >>"$tmp"
	mv "$tmp" "$ENV_FILE"
	chmod 600 "$ENV_FILE"
}

compose() {
	(set -a && . "$ENV_FILE" && set +a && docker compose -p "$PROJECT" -f "$ROOT/compose.yaml" "$@")
}

wait_healthy() {
	local tries=0
	until [ "$(docker inspect --format '{{.State.Health.Status}}' sk-db-dev 2>/dev/null || echo starting)" = "healthy" ]; do
		tries=$((tries + 1))
		[ $tries -lt 60 ] || die "database never became healthy"
		sleep 1
	done
	echo "db.sh: postgres healthy on 127.0.0.1:${POSTGRES_PORT:-5432}"
}

migrate() {
	(cd "$ROOT/app/api" && npm run migrate)
}

case "${1:-}" in
up)
	sync_env
	compose up -d
	wait_healthy
	;;
down)
	compose down
	;;
reset)
	sync_env
	compose down -v
	compose up -d
	wait_healthy
	migrate
	;;
status)
	compose ps
	;;
psql)
	set -a && . "$ENV_FILE" && set +a
	docker exec -it sk-db-dev psql -U "$POSTGRES_USERNAME" -d "$POSTGRES_DB_NAME"
	;;
migrate)
	sync_env
	wait_healthy
	migrate
	;;
*)
	echo "usage: $0 up | down | reset | status | psql | migrate" >&2
	exit 2
	;;
esac
