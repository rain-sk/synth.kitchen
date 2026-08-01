# System Architecture

## Architecture Overview

```
Browser                              Docker Container
┌──────────────┐                     ┌─────────────────────┐
│  React 18    │─── HTTP ──────────▶ │  Nginx (:80)        │
│  Vite 7      │◀─ HTTP / Response ─ │  / → SPA index.html │
│  Web Audio   │                     │  /api/* → :3000     │
│  WebMidi.js  │                     └────────┬────────────┘
└──────────────┘                              │
                                        ┌─────────────────────┐
                                        │  Bun + Express 5    │
                                        │  (Supervisor mgmt)  │
                                        └────────┬────────────┘
                                                 │
                                    ┌─────────────────────────┐
                                    │  PostgreSQL 16          │
                                    └─────────────────────────┘
```

Production: Single Docker container with Nginx serving the SPA and proxying `/api/*` to the Bun-based Express API. Supervisor manages both processes.

Development: Three independently running processes (shared watch, API watch, Vite dev server) co-managed by `concurrently`.

## Component Breakdown

### Web App (`app/web/`)

Vite 7 + React 18 single-page application. The front of synth.kitchen — where users interact with the synth.

**Audio Engine**: Built on `standardized-audio-context` for cross-browser Web Audio API compatibility. Each module maps to audio node(s) — oscillators become `OscillatorNode`, filters become `BiquadFilterNode`, etc. Modules requiring sample-accurate processing (envelopes, VCAs, sequencers) use `AudioWorkletNode` with custom processors written in plain JavaScript.

**Canvas Rendering**: Connection lines between module I/O ports drawn on a `<canvas>` overlay, updated via `requestAnimationFrame`. Module UI is HTML/CSS positioned absolutely within a scrollable viewport.

**State Management**: Single `useReducer` with `patchReducer` handling 22 action types. State includes modules, positions, connections, selection, undo/redo history, and an async action queue. Immutability enforced via `cloneAndApply`.

**Routing**: wouter (lightweight Router). Routes: `/` (patch editor), with dynamic patch loading by slug. `useLoadPatch` hook fetches from API and resets audio context.

**MIDI**: WebMidi.js provides device enumeration and event handling. `MidiContextProvider` manages input/output port selection. Three MIDI module types (CC, CLOCK, TRIGGER) receive events from the global WebMidi context.

**Recording**: `extendable-media-recorder` with WAV encoder. Captures `OutputNode.stream` MediaStream. Manual start/stop with automatic download on completion. Screenshot support via `modern-screenshot`.

### API Server (`app/api/`)

Express 5 running on Bun. RESTful API with JWT authentication.

**Entry Point**: `src/index.ts` — Attempts PostgreSQL connection with exponential retry, inserts `AppInfo` row if missing, registers routers on `apiBase` env-var prefix.

**Routers** (all prefixed by `apiBase`):
- `/auth` — POST `/login`, `/register`, `/verify/:key`, `/reset-password`; GET `/user`; DELETE `/reset-password/:key`
- `/patch` — GET `/:id`, `/info/:id`, `/random`; POST `/new` (via redirect from GET `/new`), `/ (create/fork)`
- `/password` — GET `/reset/:key`, `/reset-temp/:key`; PUT `/confirm`
- `/status` — GET `/`, PUT `/info`

**Authentication**: `express-jwt` middleware protects `/api/user` and auth endpoints. JWT token refresh via `token.controller`. Bcrypt password hashing.

**Services**: `patch.service` (create, update, fork, delete with authenticity checks), `user.service`, `password.service`, `verification.service`, `validate/registration`

**Build**: esbuild bundles to `build/index.js` with env vars inlined, sourcemaps disabled for production.

### Shared Package (`app/shared/`)

CommonJS TypeScript package shared between frontend and backend. Single source of truth for cross-boundary contracts.

**Exports**:
- **Types**: `ModuleType` enum, 19 `ModuleState` variants, `PatchState`, `Patch`, `PatchInfo`, `Connection`, `Module`, `ModulePosition`, `UserInfo`, registry queries and more
- **Versioning**: `PATCH_STATE_VERSIONS`, `CONNECTIONS_STATE_VERSIONS`, `APP_STATE_VERSIONS`, `APP_STATE_VERSION`
- **Upgrades**: `patchStateNeedsUpgrade`/`upgradePatchState`, `connectionsStateNeedsUpgrade`/`upgradeConnectionsState`, `moduleNeedsUpgrade`/`upgradeModule`
- **Utilities**: `randomId`, `randomName` (from `server-name-gen` submodule)

## Audio System Architecture

```
Patch State (modules array)
         │
         ▼
  ┌─────────────┐
  │  useNode    │── Creates audio node wrapper per module
  │  (hook)     │── Syncs state → AudioParam values
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Node Wrapper │── Wraps Web Audio API node (OscillatorNode, etc.)
  │  (17 total)  │── Manages AudioParam connections from inputs
  └──────┬──────┘
         │
    ┌────┴────┐
    ▼         ▼
 ┌──────┐ ┌──────────────┐
 │Audio │ │AudioWorklet   │
 │Node  │ │Processor      │
 │(K-rate)│(sample-accurate)│
 └──────┘ └──────────────┘
```

**Audio Context**: Singleton via `initAudio()`, lazily created on first user interaction. Restarted when loading a new patch to clean up old node graphs.

**Node Wrappers** (`app/web/src/lib/patch/audio/nodes/`): 17 classes, one per module type. Each wraps the appropriate Web Audio API node and manages:
- AudioParam connections from upstream module outputs
- State-to-parameter mapping (e.g., `frequency` → `OscillatorNode.frequency`)
- Cleanup on module removal

**AudioWorkletProcessors** (`app/web/src/lib/patch/audio/processors/`): 9 plain `.js` files for sample-accurate processing. Used by modules needing per-sample control: ENVELOPE, VCA, SEQUENCER, GATE, SCOPE, and others. State updates via `port.postMessage()`.

**Connection Graph**: `IoConnector` buttons rendered per input/output port per module. `DerivedConnectionStateContext` computes active connector state and connected sets. Canvas-drawn lines with visual feedback for active, connected-to-active, and highlighted states.

## State Management

**Patch State** (`IPatchState`):
- `modules` — Array of module definitions (id, name, type, state, position)
- `modulePositions` — Absolute pixel positions on the canvas
- `connections` — Source-to-target connections with versioned state
- `selection` — Currently selected module/connector IDs
- `history` — Undo/redo stack with `blockHistory`/`unblockHistory` flags to suppress recording
- `asyncQueue` — Deferred actions processed by `AsyncQueueDispatcher` (used during patch loading)

**Reducer**: `patchReducer` with 22 action types covering module CRUD, connection management, selection, navigation, history, and async dispatch.

**Immutability**: `cloneAndApply` ensures all state mutations produce new objects, enabling reliable history tracking.

## Persistence

**Patch Table** (`PATCH`): UUID primary key, unique slug, name, `creatorId` (FK to User), `public` boolean (default true), `patchState` (embedded JSON via `SavedPatchState`). Fork chain via `forkedFrom` self-referencing FK and `forks` OneToMany.

**SavedPatchState Table** (`SAVED_PATCH_STATE`): Versioned snapshots with tree structure. Each row has `ancestor`/`descendants` self-referencing FKs for history traversal. Created on auto-save and manual snapshots.

**State Versioning**: Three-version upgrade chains in `app/shared/src/upgrade/`:
- **Patch state**: 0.5.6 → 0.5.7 → 0.5.8
- **Connections state**: 0.5.5 → 0.5.6 → 0.5.7 (wraps raw connections, renames `gate` → `hold`)
- **Per-module**: Each module tracks its own version; upgrades run sequentially through version history

On patch load, state is upgraded to current versions before use. Downgrade paths exist for compatibility when saving to older-app clients.

## Security

- **Authentication**: JWT-based with `express-jwt` middleware. Created on login/register, validated on protected endpoints
- **Password Storage**: Bcrypt hashing
- **Email Verification**: One-time-use verification key with `EmailVerificationRequest` table
- **Password Reset**: Temp password + reset key in `PasswordResetRequest` table
- **Patch Auth**: Owner/creator checks on mutations (update, delete, fork). Public patches readable by anyone
- **Nginx**: `no-store, no-cache` headers for SPA. API proxied to localhost only
- **Known Gaps**: CORS wide open in dev mode. No explicit rate limiting. 5ms crash recovery window can cause failed API requests.

## Entity Reference

| Entity | Key Columns | Purpose |
|--------|-------------|---------|
| `User` | id, email (unique), username (unique), password, admin, verified | Accounts |
| `Patch` | id, slug, name, creatorId, patchState, public, forkedFrom, forks, samples | Named patches |
| `SavedPatchState` | id, state (JSON), createdAt, ancestor, descendants, patchId | History snapshots |
| `Sample` | id, name, data (bytea), creatorId | Audio samples |
| `AppInfo` | version (PK), data, updatedAt | Version tracking (single row) |
| `EmailVerificationRequest` | id, keyValue, creatorId | Email verification keys |
| `PasswordResetRequest` | id, keyValue, creatorId, tempPassword | Password reset tokens |

## Testing Architecture

Cypress 15.8 E2E tests. Tests live in `cypress/e2e/`, fixtures in `cypress/fixtures/`.

- **Config**: `cypress.config.ts` — base URL `http://localhost:8080`, video recording on, no screenshot on failure
- **Execution**: `npm run test` runs headless. `pre-push` hook runs full pipeline (build + e2e)
- **e2e.sh**: Starts dev server, waits for readiness, runs Cypress, cleans up on exit
