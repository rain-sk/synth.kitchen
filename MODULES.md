# synth.kitchen Module System

This document describes the structure and extension process for audio modules.

## Module Architecture Overview

The module system follows a feature-based folder structure organized by functionality:

```
lib/patch/{components,contexts,midi,state,audio}
```

## Module Type System

Modules are defined by their type enum value (in kebab-case format). Examples:
- `oscillator` → module component: `oscillator.tsx`
- `midi-clock` → module component: `midi-clock.tsx`

## Module Component Files

| File Pattern | Description | Example |
|--------------|-------------|---------|
| `lib/patch/components/module/{name}.tsx` | Module UI component (user interface) | `oscillator.tsx`, `midi-clock.tsx` |
| `{name}.ts` | Module state types (lowercase with hyphen) | Matching module type enum value |
| `{name}-state.ts` | State version arrays (uppercase constant names) | `OSCILLATOR_STATE_VERSIONS`, `MIDI_CLOCK_STATE_VERSIONS` |

## Audio Node Wrappers

Audio nodes are wrapped in PascalCase classes matching module types:

- **Files**: Lowercase name (matching module type)
- **Class names**: PascalCase matching module type
- Examples: `OscillatorNode`, `FilterNode`
- Location: `app/web/src/lib/patch/audio/nodes/{name}.ts`

## Module UI Components (`module-ui/`)

UI components that provide reusable interfaces for module parameters:

- **Location**: `lib/patch/components/module-ui/`
- Examples: 
  - `io-connectors.tsx`
  - `number-parameter.tsx`
  - `parameter-connector.tsx`

## Custom Hooks

Synth.kitchen uses custom hooks for state management and audio integration:

- **Naming**: `use*` prefix with descriptive suffix
- Examples:
  - `useApi` – API communication
  - `useScroll` – Scroll management
  - `useNode` – Audio node integration
  - `useRefBackedState` – Reference-backed state

## State Versioning System

Patch states are versioned and support upgrade/downgrade through `synth.kitchen-shared`:

- Each module has its own state version array (e.g., `OSCILLATOR_STATE_VERSIONS`)
- Upgrade function: `UPGRADE_PATCH_STATE` handles version migrations
- Shared types package (`synth.kitchen-shared`) is the single source of truth for data schemas

## How Audio Graphs Are Built

Audio graphs are constructed via functional composition of `Module` components. This modular approach allows complex synthesizer configurations to be built from simple, composable units.

## Adding New Modules

To extend synth.kitchen with a new module:

1. **Register Module Type**: Add to `ModuleType` enum in shared types
2. **Implement UI Component**: Create component at `app/web/src/lib/patch/components/module/{name}.tsx`
3. **Register Audio Node**: Add to `app/web/src/lib/patch/audio/nodes/`
4. **Implement DSP**: Create custom AudioWorkletProcessors in `app/web/src/lib/patch/audio/processors/` and register in `app/web/src/lib/patch/audio/processors/index.ts`

## Example Patch Data

- **Example JSON**: `example.json` (~41KB sample)
- **Patch Schema CSV**: `patch.csv` (~41KB lookup table)

These files provide reference data for understanding module structure and state organization.
