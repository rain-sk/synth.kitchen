# Agent Guide — synth.kitchen

Welcome to the synth.kitchen codebase. This document provides quick orientation and points you to detailed documentation for specific topics.

## Project Overview

synth.kitchen is a web-based audio synthesis platform that enables users to create, share, and fork modular synthesizer patches directly in the browser. It integrates with external MIDI and can record its output to a downloadable .wav file. Built with React 18 (Vite), TypeScript-based Express API, PostgreSQL database, and Docker deployment with an nginx reverse proxy.

## Documentation Index

### 📋 [`AGENTS.md`](./AGENTS.md) — This File

Quick reference and orientation for agents working on the project.

### 🏗️ [`ARCHITECTURE.md`](./ARCHITECTURE.md) — System Architecture

- Overall system architecture and data flow diagram
- Component breakdown (frontend, backend, infrastructure)
- Audio system architecture layers
- State management and persistence patterns
- Security architecture and known gaps
- Testing architecture overview

### 🔨 [`BUILDING.md`](./BUILDING.md) — Build & Development Process

- All build and development commands (`npm run dev`, `npm run build`, etc.)
- End-to-end testing with Cypress 15.8
- Database migration workflow (TypeORM)
- Docker deployment configuration
- Agent tools and tips for this codebase

### 🎛️ [`MODULES.md`](./MODULES.md) — Module System Structure

- Module type enum system and naming conventions
- Component file organization patterns
- Audio node wrappers and AudioWorkletProcessors
- Custom hooks (`useNode`, `useRefBackedState`, etc.)
- State versioning system with upgrade/downgrade paths
- Extension process for adding new audio modules

### 📖 [`README.md`](./README.md) — General Project Information

- Technology stack overview
- Quick start commands
- Repository structure summary
- Environment variable reference

### 📚 Additional Resources

- **SSH Tunnel Guide**: `docs/ssh-tunnel.md` — Secure database access setup (Coolify)
- **Setup Notes**: `notes.md` — Historical development log (mostly obsolete, keep for context)
- **Feature Docs**: `docs/features/` — Module builder, loading UX, renaming, patch searching
- **Example Patch Data**: `example.json` (~45KB sample) — Sample patch structure
- **App Feature Plans**: `app/web/README.md` — Feature roadmap and TODOs

## Quick Navigation by Task

| Task                           | See                                                                  |
| ------------------------------ | -------------------------------------------------------------------- |
| Set up development environment | [`BUILDING.md`](./BUILDING.md) — Build Commands                      |
| Understand system architecture | [`ARCHITECTURE.md`](./ARCHITECTURE.md) — System Architecture Diagram |
| Add new audio module           | [`MODULES.md`](./MODULES.md) — Adding New Modules                    |
| Run tests                      | [`BUILDING.md`](./BUILDING.md) — Testing (Cypress e2e)               |
| Configure database migrations  | [`BUILDING.md`](./BUILDING.md) — Database Migrations                 |
| Understand audio rendering     | [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Audio System Architecture   |
| Run development servers        | [`BUILDING.md`](./BUILDING.md) — Development Workflow                |

## Agent Tools & Tips

**Startup**: Check your memory for important information about this code base, then consult the relevant documentation above.

**Work Loop**:

- Ensure you have a plan before making changes
- After making changes to the code, check the linter (`npm run lint`) to ensure everything still builds

## Critical Files — Review Required Before Modify

- `app/api/src/entity/*.ts` – Database schema definitions (7 entities)
- `app/shared/src/types/**/*.ts` – Shared data structures and versioning logic
- `app/shared/src/upgrade/` – State versioning upgrade/downgrade functions
- `nginx.conf` – Security-critical proxy configuration
- `.env.example` (root) – SSH tunnel config template
- `app/api/.env.example` – API server config template (DB, JWT, email)

## License & Credits

synth.kitchen is an open-source modular synthesizer platform built with modern web technologies.
