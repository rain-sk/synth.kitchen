# synth.kitchen Architecture

This document describes how the system works, including data flow and key architectural patterns.

## System Architecture Diagram

```Instal/
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                        │
└─────────────────────────────────┬───────────────────────────┘
                                  │ HTTPS
                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                        nginx (port 80)                      │
│           ┌───────────┐              ┌────────────────┐     │
│           │ /         │              │ /api → proxy   │     │
│           │ (React)   │              │ (Node.js)      │     │
│           └───────────┘              └────────────────┘     │
└────────────────────────────────┬────────────────────────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              ▼                                     ▼
    ┌─────────────────────┐               ┌──────────────────┐
    │  React App (web)    │               │   API Server     │
    │  • React 18         │               │  • Express       │
    │  • Vite             │               │  • TypeORM       │
    │  • Web Audio API    │               │  • PostgreSQL    │
    │  • MIDI support     │               │  • JWT Auth      │
    └─────────────────────┘               └──────────────────┘
                                              │        ▲
                                              ▼        │
                                         ┌──────────────────┐
                                         │  PostgreSQL DB   │
                                         │  • Users         │
                                         │  • Patches       │
                                         │  • Samples       │
                                         └──────────────────┘
```

## Data Flow

1. **User Interaction**: User interacts with React UI via mouse, MIDI devices, or keyboard
2. **Audio Rendering**: Performed via `standardized-audio-context` with `AudioWorkletProcessor`
3. **State Commit**: State changes committed to web memory, then persisted to API via JWT-authenticated REST calls
4. **API Processing**: API validates input, stores patch data in PostgreSQL via TypeORM entities (`Patch`, `SavedPatchState`, `User`)
5. **Version Management**: Patch states are versioned and support upgrade/downgrade through `synth.kitchen-shared` migration utilities
6. **Patch Lineage**: Forking creates new patches referencing ancestral states for patch lineage tracking

## Key Architectural Patterns

### Feature-Based Folder Structure

```
lib/patch/{components,contexts,midi,state,audio}
```

Each directory contains related functionality with `index.ts{x}` entry points for clean imports.

### Shared Types as Single Source of Truth

The `synth.kitchen-shared` package serves as the single source of truth for data schemas. Both API and web projects import types from this shared package, ensuring consistency across the stack.

### Versioned State Objects

Patch state objects are versioned and support upgrade/downgrade paths through `UPGRADE_PATCH_STATE` utilities. Each module defines its own state version array (e.g., `OSCILLATOR_STATE_VERSIONS`).

### Functional Audio Graph Composition

Audio graphs are constructed via functional composition of `Module` components. This approach allows complex synthesizer configurations to be built from simple, composable units.

## Component Breakdown

### Frontend (React App)

- **React 18** – UI framework with hooks-based architecture
- **Vite** – Build tool and dev server
- **Web Audio API** – Real-time audio rendering via `standardized-audio-context`
- **MIDI Support** – Hardware instrument connectivity

### Backend (API Server)

- **Express** – REST API framework
- **TypeORM** – PostgreSQL ORM with entity-based data modeling
- **JWT Authentication** – `express-jwt` middleware for secure patch access
- **PostgreSQL** – Primary database

### Infrastructure

- **nginx** – Reverse proxy (port 80) handling static file serving and API routing
- **Docker** – Containerization for production deployment
- **supervisord** – Process supervisor managing API and nginx services

## Audio System Architecture

The audio system follows a layered approach:

1. **Module Components** – React components representing synthesizer modules (e.g., `oscillator.tsx`)
2. **Audio Node Wrappers** – TypeScript classes wrapping Web Audio API nodes (e.g., `OscillatorNode`)
3. **AudioWorkletProcessors** – Custom DSP implementations in `app/web/src/lib/patch/audio/processors/`
4. **standardized-audio-context** – Cross-platform Web Audio API wrapper providing consistent behavior

## State Management & Persistence

### Frontend State

- Local state managed via React hooks and custom `useRefBackedState` hook
- Audio rendering occurs independently from UI state updates
- MIDI events handled via dedicated hooks (`useNode`)

### Backend Persistence

- JWT tokens authenticate patch read/write operations
- TypeORM entities (`Patch`, `SavedPatchState`, `User`) manage database operations
- Patch lineage tracking via ancestral state references

### Versioning Strategy

- Each module maintains its own state version array
- `UPGRADE_PATCH_STATE` handles migrations between versions
- Supports both upgrade and downgrade operations for backward compatibility

## Security Architecture

### Authentication & Authorization

- JWT-based authentication with `express-jwt` middleware
- Password hashing via bcrypt (v6.0.0)
- Email verification flow for new accounts

### Current Security Practices

- CORS limited to configured `appOrigin`
- SSH tunnel script for secure database access without public exposure
- Secrets stored in `.env` (ignored by `.gitignore`)

### Known Gaps (TODOs)

- Rate limiting middleware not implemented
- Content-Security-Policy headers not configured
- Dependency scanning (no Dependabot or Snyk config)
- XSS/CSRF protection for user-generated patch JSON data
- Input validation middleware (class-validator imported but limited usage)

### Compliance Notes

- No PII beyond email/username; EU users may require data deletion mechanism
- No cookie-based sessions; JWT expires server-side (track expiration strategy)
- Encryption at rest: database not encrypted; consider pgcrypto extension

## Testing Architecture

### End-to-End Tests (Cypress 15.8)

Located in `cypress/e2e/`:

- `auth.cy.ts` – Login, registration, email verification
- `patch/random.cy.ts` – Random patch creation and editing flows
- `patch/undo-redo.cy.ts` – History navigation and state persistence
- `index.cy.ts` – Landing page and navigation

**Test Execution**:

- Headless mode: `npm run test` (requires dev server)
- CI pipeline: `npm run pre-push` (build + e2e suite)

### Unit Testing

No unit test framework currently configured. Jest is available as a potential addition for shared/api tests if needed.

## Module System Architecture

See `MODULES.md` for detailed module system documentation including:

- Module type enum system
- Component file organization (`lib/patch/components/module/`)
- Audio node wrappers and AudioWorkletProcessors
- Custom hooks (`useNode`, `useRefBackedState`, etc.)
- Extension process for adding new modules

## Database Schema

TypeORM entities defined in `app/api/src/entity/`:

- **Patch** – Main patch record with metadata and lineage tracking
- **SavedPatchState** – Versioned patch state snapshots
- **User** – User account information with bcrypt-hashed passwords

Database migrations should always be used (never `synchronize: true`) to prevent data loss. Generate with `npm run migration:generate` and apply via `npm run migrate`.

## Deployment Architecture

### Development

- Three concurrent processes: shared types, API server, web app
- Managed via `npm run dev`

### Production

- Docker containerized deployment
- nginx reverse proxy handles all external traffic on port 80
- supervisord manages Node.js API and nginx processes
- `.env*` files stripped from production images for security

## Agent Guardrails

### Critical Files Never Modified Without Review

- `app/api/src/entity/*.ts` – Database schema definitions
- `app/shared/src/types/**/*.ts` – Shared data structures and versioning logic
- `nginx.conf` – Security-critical proxy configuration
- `.env.example` – Template for environment variables; avoid hardcoding credentials

### Required Reviews

- Any change to database migrations (`app/api/src/migration/*`)
- Changes to `PATCH_STATE_VERSIONS` or upgrade logic (`app/shared/src/upgrade.ts`)
- Authentication flow modifications (auth router, middleware)

### Rate Limits & Throttling

- Not implemented; add rate limiting to prevent credential stuffing or DoS
