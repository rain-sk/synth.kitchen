# Building synth.kitchen

This document covers the build process, deployment configuration, and infrastructure setup.

## Build Commands

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
```

## Testing

### End-to-End Tests (Cypress)

**Tools**: Cypress 15.8 for end-to-end testing  
**Location**: `cypress/e2e/` directory

**Test Suites**:
- `auth.cy.ts` – Login, registration, email verification
- `patch/random.cy.ts` – Random patch creation and editing flows
- `patch/undo-redo.cy.ts` – History navigation and state persistence
- `index.cy.ts` – Landing page and navigation

**Run Locally**:

```bash
npm run test  # Runs Cypress in headless mode (requires dev server)
```

**CI Execution**:  
The `pre-push` script runs the development server then executes `scripts/e2e.sh`, which starts dev servers in background, waits for availability, runs tests, then cleans up processes.

**Coverage Notes**: No unit test framework currently configured; rely on e2e tests for validation. Jest is available as a potential addition for shared/api tests if needed.

## Database Migrations

**TypeORM Migrations Best Practices**:

- Never use `synchronize: true` - always use migrations to avoid data loss
- Generate migrations with `npm run migration:generate` after changes to entity definitions (requires SSH tunnel)
- Run `npm run migrate` before starting the API to ensure schema is up-to-date (requires SSH tunnel)
- Each migration file represents a specific change - easy to track and revert
- Check `src/data-source.ts` for TypeORM configuration

## Development Workflow

1. **Setup SSH Tunnel** (required for DB access):
   ```bash
   npm run tunnel
   ```

2. **Run Database Migrations**:
   ```bash
   npm run migrate
   ```

3. **Start Development Servers** (runs shared, api, web concurrently):
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   - E2E: `npm run test` or `npm run pre-push`

## Audio Module Extension Process

To add new modules to synth.kitchen:

1. Add new module to `ModuleType` enum in shared types
2. Implement module UI in `app/web/src/lib/patch/components/module/{name}.tsx`
3. Register audio node in `app/web/src/lib/patch/audio/nodes/`
4. Implement custom DSP with custom AudioWorkletProcessors in `app/web/src/lib/patch/audio/processors/` (registered in `app/web/src/lib/patch/audio/processors/index.ts`)

## Environment Configuration

**Required Environment Variables** (from `.env.example` and `app/api/src/env.ts`):

```bash
REMOTE_USER="example"           # SSH tunnel username
REMOTE_HOST="0.0.0.0"          # SSH tunnel host  
POSTGRES_IMAGE="postgres:16-alpine"
API_PORT=3000                  # API server port (default in env.ts)
JWT_SECRET=your-secret         # JWT signing secret
DATABASE_URL=postgresql://...  # Database connection string
```

Note: `API_PORT`, `JWT_SECRET`, and `DATABASE_URL` must be defined separately; check `app/api/src/env.ts` for defaults.

## Docker Deployment Configuration

- **Supervisor**: `supervisord.conf` manages Node.js API and nginx processes
- **Reverse Proxy**: `nginx.conf` routes `/api` to Node.js and serves static React build
- **Security**: Docker builds strip `.env*` files before production image (`Dockerfile:12`)
- **Security**: `/.env` never committed (in `.gitignore`)

## Agent Tools & Tips

**Startup**:
- Check your memory for important information about this code base.

**Work Loop**:
- Ensure you have a plan. If there is no clear plan, work with the user to create one.
- After making changes to the code, check the linter (`npm run lint`) to ensure everything still builds.

**Database Access**:
- Use `npm run tunnel` to SSH tunnel to remote PostgreSQL (requires `.env` configuration)
- Container IP dynamically retrieved via `docker inspect`
- SSH credentials from `.env` file - never commit to git
