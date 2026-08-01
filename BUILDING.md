# Build & Development Process

## Prerequisites

- **Node.js** (latest LTS recommended)
- **PostgreSQL 16** — Local via Docker or remote via SSH tunnel (see `SSH Tunnel` section)

## Development Workflow

### First-Time Setup

```bash
npm install          # Runs "prepare" — installs all 3 workspace packages
```

This sets up `node_modules` for all packages.

### Day-to-Day Development

```bash
npm run dev          # Starts all 3 servers concurrently (shared, api, web)
```

Spawns three processes via `concurrently` with `-k` (kill-all-on-exit):
- **shared**: File watcher rebuilding `app/shared` on changes
- **api**: `tsx --watch` (Node.js TS execution with hot reload) + concurrent `tsc --watch` for type checking
- **web**: `vite --host` (HMR dev server) + `tsc --watch` for type checking

Individual servers (for targeted debugging):
```bash
npm run dev:shared   # Just shared package watcher
npm run dev:api      # Just API server + type checker
npm run dev:web      # Just Vite dev server + type checker
```

### Post-Setup

After `npm install`, copy `.env.example` → `app/api/.env` and fill in your database credentials, JWT secret, and email config.

Run migrations (see `Database Migrations` section) if this is a fresh database.

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Dev build: `npm i` then concurrent shared/api/web builds |
| `npm run build:prod` | Production build: `npm ci` (rebuilds shared via `prepare` hook) then concurrent api:prod/web:prod |
| `npm run build:shared` | Compile shared package to `app/shared/build/` |
| `npm run build:api` | esbuild → `app/api/build/index.js` (env inlined, sourcemaps off) |
| `npm run build:web` | `tsc && vite build` → `app/web/build/` |
| `npm run lint` | Runs `npm i --no-audit` then TypeScript type-check on all 3 packages concurrently |

**Important**: After making code changes, run `npm run lint` to verify type correctness across the monorepo.

The shared package is a dependency of both API and web. Changes to `app/shared/` require a rebuild of both consumers.

## Testing

```bash
npm run test         # Headless Cypress run
npm run pre-push     # Full pipeline: npm ci && build && e2e tests
```

Cypress configuration (`cypress.config.ts`):
- Base URL: `http://localhost:8080`
- Video recording: enabled
- Screenshots on failure: disabled
- Watch for file changes: enabled

The `scripts/e2e.sh` script handles the full E2E test lifecycle:
1. Starts the dev server
2. Waits for it to be ready
3. Runs Cypress in headless mode
4. Cleans up processes on exit

## Database Migrations

TypeORM migrations manage schema changes. Migration files live in `app/api/src/migration/`.

| Command | Description |
|---------|-------------|
| `npm run migrate` | Start SSH tunnel (auto-cleanup), run `npm i` in `app/api/`, then pending migrations |
| `npm run migration:generate` | Auto-generate migration from entity diffs to current DB |
| `npm run migration:create` | Create empty migration scaffold |
| `npm run migration:create` | Create empty migration scaffold at `./src/migration/NewMigration` |

Data source config: `app/api/src/data-source.ts`

In production, migrations run automatically after build via `postbuild:prod` in `app/api/package.json`.

### SSH Tunnel Setup

For accessing a remote database during development:

```bash
./scripts/ssh-tunnel.sh     # Starts tunnel using .env REMOTE_USER/REMOTE_HOST
```

See `docs/ssh-tunnel.md` for full setup instructions.

**Important**: The `POSTGRES_IMAGE` variable must match the PostgreSQL version your Coolify instance uses (e.g., `postgres:16-alpine`). A mismatch (like having `16-alpine` configured but `17-alpine` running) will cause the script to fail.

If you prefer a local database, change `POSTGRES_IMAGE` in `.env` and run PostgreSQL via Docker.

## Docker Deployment

### Build

```dockerfile
# Stage 1: Build (node:alpine)
# - Copies app/, submodules/, package*.json
# - Runs npm run build:prod
# - Strips dev dependencies from API

# Stage 2: Serve (nginx:alpine)
# - Installs Bun, Python venv with supervisor, tini
# - Copies built API, web assets, nginx.conf, supervisord.conf
```

### Runtime

```
Container (port 80)
├── Nginx ────────────────── Serves SPA, proxies /api/* → :3000
├── Supervisor (tini init) ─ Manages process lifecycle
│   ├── Bun ──────────────── Runs API (npx bun run index.js)
│   └── Nginx ────────────── Foreground daemon
```

Both processes configured with `autorestart=true`. Supervisor's 5ms crash recovery is fast but can drop in-flight requests — frontend handles 502 with retry/redirect.

### Environment at Runtime

No `.env` file at runtime (deleted in build stage). All configuration injected as container environment variables: database credentials, JWT secret, email config, API host, etc.

### Submodules

`server-name-gen` is a git submodule. Its `dist/` and `package.json` are explicitly copied into the API's `node_modules` in the Docker build.

## Agent Tips

- **Always run `npm run lint`** after making code changes
- **Critical files** — review before modifying:
  - `app/api/src/entity/*.ts` — Database schema (changes require migrations)
  - `app/shared/src/types/**/*.ts` — Shared contracts between front/backend
  - `app/shared/src/upgrade/` — State versioning logic
  - `nginx.conf` — Security-critical proxy configuration
- **Monorepo awareness**: Changes to `app/shared/` require rebuilding both `app/api/` and `app/web/`
- **ESLint**: Not used — linting is via `tsc --noEmit` (type checking only)
- **No unit tests**: Testing is E2E-only via Cypress
