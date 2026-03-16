# synth.kitchen — Audio Synthesis Platform

synth.kitchen is a web-based platform for creating and sharing modular synthesizer patches directly in the browser.

## Technologies

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Express (TypeScript) with TypeORM
- **Database**: PostgreSQL
- **Audio**: Web Audio API via `standardized-audio-context`, with custom AudioWorkletProcessors
- **Testing**: Cypress 15.8 (end-to-end)
- **Deployment**: Docker with nginx reverse proxy

## Quick Start

```bash
# Install dependencies
npm install

# Build all projects (shared, api, web)
npm run build

# Production build
npm run build:prod

# Run all services in dev mode (shared, api, web concurrently)
npm run dev

# Lint all projects
npm run lint

# Database migrations
npm run tunnel        # Opens SSH tunnel for DB access
npm run migrate       # Run database migrations

# Run tests (Cypress e2e)
npm run test          # Headless mode - requires dev server
npm run pre-push      # Build + e2e suite (used in CI)
```

## Repository Structure

### App Modules

- **app/api/** – Express backend with REST API, JWT authentication, TypeORM persistence
- **app/web/** – React frontend application
- **app/shared/** – Shared TypeScript types, constants (`PATCH_STATE_VERSIONS`), upgrade utilities
- **submodules/server-name-gen/** – Utility for generating unique names (npm)

### Testing/Deployment Infrastructure

- **cypress/** – End-to-end test suite
- **scripts/** – Utilities (`e2e.sh`, `ssh-tunnel.sh`)
- **nginx.conf** – Nginx reverse proxy (routes `/api` → Node.js, serves React static build)
- **supervisord.conf** – Process supervisor for API + nginx

### etc.

- **docs/** – Documentation (SSH tunnel guide, setup notes)

## Environment Variables

See `.env.example` and `app/api/src/env.ts`:

```bash
REMOTE_USER="example"           # SSH tunnel username
REMOTE_HOST="0.0.0.0"          # SSH tunnel host
POSTGRES_IMAGE="postgres:16-alpine"
API_PORT=3000                  # Default in env.ts
JWT_SECRET=your-secret         # JWT signing secret
DATABASE_URL=postgresql://...  # Database connection string
```

Note: `API_PORT`, `JWT_SECRET`, and `DATABASE_URL` must be defined separately; the first two have defaults in `env.ts`.

## Further Reading

- **SSH Tunnel Guide**: `docs/ssh-tunnel.md`
- **Setup Notes**: `docs/notes.md` (historical development log)
- **Example Patch Data**: `example.json` (~41KB sample)
- **Patch Schema**: `patch.csv` (~41KB lookup table)
