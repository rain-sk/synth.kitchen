#!/usr/bin/env bash
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

sync_env() {
	[ -f "$API_ENV" ] || die "no $API_ENV (copy app/api/.env.example)"

	local api_db api_user api_pass api_host api_port
	api_host=$(grep '^POSTGRES_HOST=' "$API_ENV" | cut -d= -f2- || true)
	api_db=$(grep '^POSTGRES_DB_NAME=' "$API_ENV" | cut -d= -f2- || true)
	api_user=$(grep '^POSTGRES_USERNAME=' "$API_ENV" | cut -d= -f2- || true)
	api_pass=$(grep '^POSTGRES_PASSWORD=' "$API_ENV" | cut -d= -f2- || true)
	api_port=$(grep '^POSTGRES_PORT=' "$API_ENV" | cut -d= -f2- || true)
	[ -n "$api_port" ] || api_port=5432

	[ -n "$api_host" ] || die "POSTGRES_HOST missing from $API_ENV"
	case "$api_host" in
	localhost | 127.0.0.1) ;;
	*)
		die "POSTGRES_HOST is '$api_host', not localhost. This script only manages a local database. Point app/api/.env at localhost, or run migrations against the remote host deliberately."
		;;
	esac

	[ -n "$api_db" ] || die "POSTGRES_DB_NAME missing from $API_ENV"
	[ -n "$api_user" ] || die "POSTGRES_USERNAME missing from $API_ENV"

	if [ -n "$api_pass" ]; then
		case "$api_pass" in
		*[!A-Za-z0-9]*)
			die "POSTGRES_PASSWORD in $API_ENV uses characters outside A-Za-z0-9. compose interpolation and sed will mangle it - replace it with one from: head -c 24 /dev/urandom | base64 | tr -d '/+='"
			;;
		esac
	fi

	if [ -z "$api_pass" ]; then
		api_pass="$(head -c 24 /dev/urandom | base64 | tr -d '/+=' | head -c 24)"
		sed -i.bak "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$api_pass|" "$API_ENV"
		rm -f "$API_ENV.bak"
		echo "db.sh: generated a POSTGRES_PASSWORD in $API_ENV"
	fi

	local tmp
	tmp="$(mktemp)"
	grep -v '^POSTGRES_DB_NAME=' "$ENV_FILE" | grep -v '^POSTGRES_USERNAME=' |
		grep -v '^POSTGRES_PASSWORD=' | grep -v '^POSTGRES_PORT=' >"$tmp" || true
	{
		echo "POSTGRES_DB_NAME=$api_db"
		echo "POSTGRES_USERNAME=$api_user"
		echo "POSTGRES_PASSWORD=$api_pass"
		echo "POSTGRES_PORT=$api_port"
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
	echo "db.sh: postgres healthy on 127.0.0.1:$(grep '^POSTGRES_PORT=' "$ENV_FILE" | cut -d= -f2-)"
}

migrate() {
	(cd "$ROOT/app/api" && npm run migrate)
}

SWEEP_SQL='
BEGIN;
CREATE TEMP TABLE e2e_users ON COMMIT DROP AS
	SELECT id FROM "user" WHERE email LIKE $$e2e-%@synth.kitchen$$;
CREATE TEMP TABLE doomed_patches ON COMMIT DROP AS
	SELECT id FROM patch WHERE "creatorId" IN (SELECT id FROM e2e_users);
CREATE TEMP TABLE doomed_states ON COMMIT DROP AS
	SELECT "stateId" AS sid FROM patch
	WHERE id IN (SELECT id FROM doomed_patches) AND "stateId" IS NOT NULL;
UPDATE patch SET "forkedFromId" = NULL
	WHERE "forkedFromId" IN (SELECT id FROM doomed_patches);
UPDATE saved_patch_state SET "patchId" = NULL
	WHERE "patchId" IN (SELECT id FROM doomed_patches);
DELETE FROM patch WHERE id IN (SELECT id FROM doomed_patches);
UPDATE saved_patch_state SET "ancestorId" = NULL
	WHERE "ancestorId" IN (SELECT sid FROM doomed_states);
DELETE FROM saved_patch_state WHERE id IN (SELECT sid FROM doomed_states);
DELETE FROM email_verification_request WHERE "userId" IN (SELECT id FROM e2e_users);
DELETE FROM password_reset_request WHERE "userId" IN (SELECT id FROM e2e_users);
DELETE FROM "user" WHERE id IN (SELECT id FROM e2e_users);
COMMIT;
SELECT
	(SELECT count(*) FROM "user" WHERE email LIKE $$e2e-%@synth.kitchen$$) AS e2e_users_left,
	(SELECT count(*) FROM patch WHERE "creatorId" IN
		(SELECT id FROM "user" WHERE email LIKE $$e2e-%@synth.kitchen$$)) AS e2e_patches_left,
	(SELECT count(*) FROM patch) AS patches_total;
'

sweep_e2e() {
	set -a
	. "$ENV_FILE"
	set +a
	docker exec -i sk-db-dev psql -U "$POSTGRES_USERNAME" -d "$POSTGRES_DB_NAME" \
		-v ON_ERROR_STOP=1 -q -c "$SWEEP_SQL"
}

assert_local_listener() {
	local port
	port=$(grep '^POSTGRES_PORT=' "$ENV_FILE" | cut -d= -f2-)
	[ -n "$port" ] || port=5432

	if command -v lsof >/dev/null 2>&1; then
		local pid comm
		for pid in $(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null); do
			comm=$(ps -o comm= -p "$pid" 2>/dev/null | tr -d ' ')
			case "$comm" in
			ssh)
				die "127.0.0.1:$port is an ssh tunnel - ssh-tunnel.sh forwards the PRODUCTION database there. Refusing to migrate. Close the tunnel, or set POSTGRES_PORT to something else in app/api/.env."
				;;
			esac
		done
	fi

	if ! docker port sk-db-dev 5432/tcp 2>/dev/null | grep -q ":$port\$"; then
		die "127.0.0.1:$port is not published by the sk-db-dev container this script manages. Refusing to run migrations against an unknown database. Run: ./scripts/db.sh up"
	fi
}

case "${1:-}" in
up)
	sync_env
	compose up -d
	wait_healthy
	assert_local_listener
	;;
down)
	compose down
	;;
reset)
	sync_env
	assert_local_listener
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
	assert_local_listener
	wait_healthy
	migrate
	;;
sweep-e2e)
	sync_env
	assert_local_listener
	wait_healthy
	sweep_e2e
	;;
*)
	echo "usage: $0 up | down | reset | status | psql | migrate | sweep-e2e" >&2
	exit 2
	;;
esac
