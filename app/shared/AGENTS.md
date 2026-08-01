# app/shared Module Documentation

## Overview

The `app/shared` module is a TypeScript package that serves as the shared data layer for the synth.kitchen application. It provides type definitions, state management utilities, and upgrade functions that are used by both the API server and web frontend.

## Structure

```
app/shared/
├── src/
│   ├── types/              # Type definitions for patches, modules, and connections
│   ├── upgrade/            # State upgrade utilities for versioned data
│   ├── utils/              # Utility functions (randomId, randomName)
│   └── index.ts            # Main export file
├── build/                  # Compiled output
├── package.json           # Package configuration
└── tsconfig.json          # TypeScript configuration
```

## Parallel Structures: Types and Upgrades

The module maintains a parallel structure between type definitions and upgrade utilities:

```
src/types/patch/module/
├── clock.ts                # Clock module state types
├── compressor.ts          # Compressor module state types
├── delay.ts               # Delay module state types
├── envelope.ts            # Envelope module state types
├── filter.ts              # Filter module state types
├── gain.ts                # Gain module state types
├── gate.ts                # Gate module state types
├── limiter.ts             # Limiter module state types
├── midi-cc.ts             # MIDI CC module state types
├── midi-clock.ts          # MIDI Clock module state types
├── midi-trigger.ts        # MIDI Trigger module state types
├── noise.ts               # Noise module state types
├── oscillator.ts          # Oscillator module state types
├── output.ts              # Output module state types
├── pan.ts                 # Pan module state types
├── scope.ts               # Scope module state types
├── sequencer.ts           # Sequencer module state types
├── shift.ts               # Shift module state types
├── vca.ts                 # VCA module state types
└── group.ts               # Module group state types

src/upgrade/module/
├── clock.ts                # Clock module upgrade functions
├── compressor.ts          # Compressor module upgrade functions
├── delay.ts               # Delay module upgrade functions
├── envelope.ts            # Envelope module upgrade functions
├── filter.ts              # Filter module upgrade functions
├── gain.ts                # Gain module upgrade functions
├── gate.ts                # Gate module upgrade functions
├── limiter.ts             # Limiter module upgrade functions
├── midi-cc.ts             # MIDI CC module upgrade functions
├── midi-clock.ts          # MIDI Clock module upgrade functions
├── midi-trigger.ts        # MIDI Trigger module upgrade functions
├── noise.ts               # Noise module upgrade functions
├── oscillator.ts          # Oscillator module upgrade functions
├── output.ts              # Output module upgrade functions
├── pan.ts                 # Pan module upgrade functions
├── scope.ts               # Scope module upgrade functions
├── sequencer.ts           # Sequencer module upgrade functions
├── shift.ts               # Shift module upgrade functions
├── vca.ts                 # VCA module upgrade functions
└── group.ts               # Module group upgrade functions
```

## Type Definition Pattern

Each module type file follows a consistent pattern:

```typescript
// Example: src/types/patch/module/oscillator.ts

export type OSCILLATOR_STATE_VERSIONS = ["0.5.12", "0.5.11", "0.5.2", "0.5.0"];
export const OSCILLATOR_STATE_VERSIONS: OSCILLATOR_STATE_VERSIONS = [
  "0.5.12",
  "0.5.11",
  "0.5.2",
  "0.5.0",
];

export type OSCILLATOR_STATE = {
  ["0.5.12"]: {
    version: "0.5.12";
    transpose: number;
    frequency: number;
    detune: number;
    level: number;
    waveform: "sine" | "triangle" | "square" | "sawtooth";
  };
  ["0.5.11"]: {
    version: "0.5.11";
    transpose: number;
    frequency: number;
    detune: number;
    peak: number;
    waveform: "sine" | "triangle" | "square" | "sawtooth";
  };
  // ... previous versions
};
```

Key characteristics:

- **Version Array**: Ordered from newest to oldest
- **Union Type**: Each version has its own state shape
- **Version Field**: Each state includes a version identifier
- **Backward Compatibility**: Newer versions extend older versions

## Upgrade Function Pattern

Each upgrade file implements two functions:

```typescript
// Example: src/upgrade/module/oscillator.ts

import {
  OSCILLATOR_STATE,
  OSCILLATOR_STATE_VERSIONS,
} from "../../types/patch/module";

export function needsUpgrade(state: OSCILLATOR_STATE[keyof OSCILLATOR_STATE]) {
  return state.version !== OSCILLATOR_STATE_VERSIONS[0];
}

export function upgrade(
  state: OSCILLATOR_STATE[keyof OSCILLATOR_STATE],
): OSCILLATOR_STATE[OSCILLATOR_STATE_VERSIONS[0]] {
  // Handle legacy states without version field
  if (
    !state.version &&
    "frequency" in state &&
    "detune" in state &&
    "waveform" in state
  ) {
    state = { ...(state as any), version: "0.5.0" };
  }

  // Sequential upgrade path
  switch (state.version) {
    case "0.5.0": {
      // Upgrade from 0.5.0 to 0.5.2
      const newState: OSCILLATOR_STATE["0.5.2"] = {
        ...state,
        version: "0.5.2",
        transpose: 0, // Add new field
        // ... transform existing fields
      };
      state = newState;
    }

    case "0.5.2": {
      // Upgrade from 0.5.2 to 0.5.11
      // ... transformation logic
    }

    // ... additional upgrade steps

    case OSCILLATOR_STATE_VERSIONS[0]:
      return state; // Already at latest version
  }

  throw new Error(
    `Unable to upgrade given state object. OSCILLATOR state: ${JSON.stringify(state)}.`,
  );
}
```

Key characteristics:

- **needsUpgrade()**: Simple version check
- **upgrade()**: Sequential transformation through versions
- **Fallback Handling**: Handles legacy states without version fields
- **Error Handling**: Throws descriptive errors for unsupported states
- **Type Safety**: Uses TypeScript's type system for safe transformations

## Version Evolution Examples

### Oscillator Module Evolution

**0.5.0 → 0.5.2**: Added `transpose` field, split `detune` into coarse/fine components
**0.5.2 → 0.5.11**: Added `peak` parameter for amplitude control
**0.5.11 → 0.5.12**: Renamed `peak` to `level` for consistency

### Envelope Module Evolution

**0.5.0 → 0.5.4**: Renamed `gate` to `hold` for semantic clarity
**0.5.4 → 0.5.5**: Reverted `hold` back to `gate` (design decision)
**0.5.5 → 0.5.7**: Finalized on `hold` parameter name

## Key Components

### 1. Type Definitions (`src/types/`)

#### Patch Types (`src/types/patch/`)

- **PatchState**: Represents the complete state of a synthesizer patch
- **Module**: Represents individual audio modules (oscillators, filters, etc.)
- **Connection**: Represents connections between module I/O ports
- **PATCH_STATE_VERSIONS**: Version history for patch state format

#### Module Types (`src/types/patch/module/`)

- 24 different module types defined (CLOCK, COMPRESSOR, DELAY, etc.)
- Each module has its own state type and version history
- Default states provided for all module types

### 2. Upgrade Utilities (`src/upgrade/`)

- **patchStateNeedsUpgrade**: Checks if a patch state needs upgrading
- **upgradePatchState**: Upgrades patch state to current version
- **moduleNeedsUpgrade**: Checks if a module needs upgrading
- **upgradeModule**: Upgrades module state to current version
- **connectionsStateNeedsUpgrade**: Checks if connections need upgrading
- **upgradeConnectionsState**: Upgrades connections state to current version

### 3. Utility Functions (`src/utils/`)

- **randomId**: Generates random IDs for modules and connections
- **randomName**: Generates random names for patches

## Versioning Strategy

The shared module uses semantic versioning for all state types:

- **PATCH_STATE_VERSIONS**: ["0.5.8", "0.5.7", "0.5.6"]
- **APP_STATE_VERSIONS**: ["0.5.12", "0.5.11", "0.5.10"]
- Each module type has its own version history

## Usage Patterns

### For API Server

```typescript
import {
  PatchState,
  ModuleType,
  upgradePatchState,
} from "synth.kitchen-shared";

// Load patch from database
const savedPatch = await db.getPatch(patchId);

// Check if upgrade needed
if (patchStateNeedsUpgrade(savedPatch.state)) {
  savedPatch.state = upgradePatchState(savedPatch.state);
}

// Use the patch state
```

### For Web Frontend

```typescript
import { ModuleType, defaultModuleState } from "synth.kitchen-shared";

// Create a new oscillator module
const oscillator = {
  id: "osc1",
  type: ModuleType.OSCILLATOR,
  state: defaultModuleState(ModuleType.OSCILLATOR),
};
```

## Agent Guidelines

### Critical Files (Review Required)

- `src/types/patch/module/index.ts` - Module type definitions
- `src/types/patch/index.ts` - Patch state definitions
- `src/upgrade/patch-state.ts` - Patch state upgrade logic
- `src/upgrade/module/*.ts` - Individual module upgrade functions

### Common Tasks

1. **Adding New Module Types**:
   - Add new enum value to `ModuleType`
   - Create new module state type file in `src/types/patch/module/`
   - Add default state to `DefaultModuleStates`
   - Create upgrade function in `src/upgrade/module/`

2. **Version Upgrades**:
   - Add new version to appropriate `*_STATE_VERSIONS` array
   - Implement upgrade function in corresponding upgrade file
   - Update default states if needed

3. **Type Changes**:
   - Ensure backward compatibility
   - Add upgrade paths for existing data
   - Update all references in both API and web code

### Testing Strategy

- No unit tests currently exist in this package
- Testing is done through integration with API and web components
- Changes should be validated by running the full application

## Build Process

```bash
# Build the shared package
npm run build

# This compiles TypeScript to build/ directory
# Output includes .js and .d.ts files
```

## Dependencies

- TypeScript 5.9+
- No runtime dependencies (pure type definitions and utilities)

## Best Practices

1. **Version Compatibility**: Always maintain backward compatibility when changing types
2. **Upgrade Paths**: Provide clear upgrade paths for versioned data
3. **Type Safety**: Use TypeScript's type system to prevent runtime errors
4. **Documentation**: Keep this file updated with any architectural changes
5. **Review Process**: All changes to core types should be reviewed by team members

## Detailed Module Analysis

### Oscillator Module

- **Current Version**: 0.5.12
- **State Fields**: version, transpose, frequency, detune, level, waveform
- **Waveform Options**: sine, triangle, square, sawtooth
- **Upgrade Path**: 0.5.0 → 0.5.2 → 0.5.11 → 0.5.12

### Envelope Module

- **Current Version**: 0.5.7
- **State Fields**: version, hold, attack, decay, sustain, release, peak
- **Upgrade Path**: 0.5.0 → 0.5.4 → 0.5.5 → 0.5.7
- **Note**: Field naming evolved (gate ↔ hold) during development

### Module Groups

- **Special Case**: Module groups can contain other modules and connections
- **State Fields**: version, name, modules, connections, exposedParameters
- **Purpose**: Allows creating reusable module clusters

## Working with the Parallel Structure

### Adding a New Module

1. **Create Type Definition** (`src/types/patch/module/new-module.ts`):
   - Define version array
   - Define state union type with all versions
   - Export both type and constant

2. **Add to Module Index** (`src/types/patch/module/index.ts`):
   - Import new module types
   - Add to ModuleType enum
   - Add to ModuleState type
   - Add to DefaultModuleStates
   - Export new types

3. **Create Upgrade Function** (`src/upgrade/module/new-module.ts`):
   - Implement needsUpgrade()
   - Implement upgrade() with sequential path
   - Handle legacy states if needed

4. **Update Main Exports** (`src/index.ts`):
   - Export new types from types
   - Export new upgrade functions

### Modifying Existing Module

1. **Add New Version** to version array (prepend to keep newest first)
2. **Update State Type** with new version definition
3. **Update Upgrade Function** with new transformation step
4. **Update Default State** if new fields added
5. **Test Upgrade Path** with existing data

### Version Management Best Practices

- Always maintain backward compatibility
- Provide clear migration paths
- Document breaking changes
- Test upgrade sequences thoroughly
- Consider data loss prevention in transformations
