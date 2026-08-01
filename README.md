# synth.kitchen

In-browser modular synthesizer platform — create, share, and fork modular synth patches directly from your browser.

[Live Application](https://synth.kitchen)

## Overview

synth.kitchen lets you build modular synthesizer patches with a drag-and-drop interface in the browser. Connect oscillators, filters, envelopes, sequencers, and effects together. Import/export patches, sync with external MIDI devices, and record your output as downloadable WAV files.

Key features:
- **19 module types**: oscillators, noise, filters, effects, envelopes, VCAs, sequencers, MIDI input, and more
- **MIDI integration**: Connect external MIDI controllers for CC, clock sync, and note triggering
- **WAV recording**: Record and download your patch output
- **Patch sharing**: Public/private patches with forking support
- **Undo/redo**: Full history with manual snapshots and auto-save
- **Responsive canvas**: Drag-and-drop module placement with keyboard navigation

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite 7, TypeScript, Web Audio API (`standardized-audio-context`), WebMidi.js, wouter (routing) |
| **Backend** | Express 5, Bun runtime, TypeORM, PostgreSQL 16 |
| **Shared** | TypeScript package with types, state versioning, upgrade logic |
| **Testing** | Cypress 15.8 (E2E) |
| **Deployment** | Docker (multi-stage Node build → Alpine Nginx), Nginx, Supervisor |

## Quick Start

```bash
npm install        # Runs prepare script: installs all 3 workspaces
npm run dev        # Starts shared (watch), API (watch), web (Vite dev) servers
```

Requires a PostgreSQL database accessible at the configured host (see Environment Variables).

## Repository Structure

```
synth.kitchen/
├── app/
│   ├── api/           # Backend: Express API + TypeORM
│   ├── shared/        # Shared types, state versioning, utilities
│   └── web/           # Frontend: React SPA + audio engine
├── cypress/           # End-to-end tests (Cypress 15)
├── docs/              # Documentation
│   ├── features/      # Feature-specific docs (module-builder, module-loading-ux, module-renaming, patch-searching)
│   └── ssh-tunnel.md  # Secure database access setup (Coolify)
├── scripts/           # CI/dev helpers (e2e.sh, ssh-tunnel.sh)
├── submodules/
│   └── server-name-gen/  # Random adjective-noun generator
├── notes.md          # Historical development log (archival)
├── example.json      # Sample patch structure (~45KB)
├── Dockerfile        # Multi-stage build (Node → Nginx)
├── nginx.conf        # Nginx proxy config (SPA + API)
├── supervisord.conf  # Process manager (Bun API + Nginx)
├── cypress.config.ts # Cypress configuration
└── .env.example      # Environment variable template
```

## Environment Variables

Two environment configuration files:

**Root `.env.example`** — SSH tunnel config for remote database access:
- `REMOTE_USER` — SSH username for the remote host
- `REMOTE_HOST` — Remote server address
- `POSTGRES_IMAGE` — Docker image for the remote database (must match what Coolify uses, e.g., `postgres:16-alpine`)

**`app/api/.env.example`** — API server config: Database credentials, JWT secret, email config, API host ports

**Frontend** (`VITE_API_HOST`) — API server URL for the web app to connect to (set in `app/api/.env` as `APP_ORIGIN`)

## Documentation

- [`AGENTS.md`](./AGENTS.md) — Agent quick reference and navigation
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — System architecture, audio engine, state management
- [`BUILDING.md`](./BUILDING.md) — Build commands, testing, migrations, Docker deployment
- [`MODULES.md`](./MODULES.md) — Module system, audio nodes, adding new modules

## License

Open-source modular synthesizer platform.
