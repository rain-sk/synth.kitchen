# Module System Structure

## Module Type Enum

`ModuleType` is defined in `app/shared/src/types/patch/module/index.ts` with 19 module types organized into 3 categories:

**Sounds**
- `OSCILLATOR` — Waveform oscillator (sine, square, saw, triangle)
- `NOISE` — White noise generator

**Effects**
- `FILTER` — Biquad filter (lowpass, highpass, bandpass, etc.)
- `COMPRESSOR` — Audio compressor
- `DELAY` — Delay/reverb effect
- `LIMITER` — Audio limiter
- `PAN` — Stereo panner
- `SCOPE` — Visual waveform/level scope

**Control**
- `CLOCK` — Tempo clock (default 120 BPM)
- `ENVELOPE` — ADSR envelope generator
- `VCA` — Voltage-controlled amplifier (envelope-following gain)
- `GATE` — Gate output module
- `GAIN` — Simple gain control
- `SEQUENCER` — 16-step sequencer
- `SHIFT` — Value mapper (min→min, max→max)

**I/O**
- `MIDI_CC` — MIDI control change receiver
- `MIDI_CLOCK` — MIDI clock sync receiver
- `MIDI_TRIGGER` — MIDI note trigger receiver
- `OUTPUT` — Final output (stereo mix to recording/streaming)

## Module State

Each module type has a corresponding state type (e.g., `OscillatorState`, `FilterState`) forming a discriminated union on `ModuleState`. States include a `version` field for upgrade tracking.

**Default States**: `DefaultModuleStates` maps each `ModuleType` to its default state object. The `defaultModuleState(type)` helper returns the initialized state.

**Module Structure** (`Module` type):
- `id` — UUID identifier
- `name` — User-editable display name
- `type` — `ModuleType` enum value
- `state` — Type-specific state object (versioned)
- `position` — Canvas coordinates (managed via `modulePositions` in patch state)

## State Versioning

Each module type and the overall patch state track version history. On load, versions are automatically upgraded to current.

**Version Hierarchy** (newest → oldest):

| Module | Versions | Key Changes |
|--------|----------|-------------|
| OSCILLATOR | 0.5.12, 0.5.11, 0.5.2, 0.5.0 | Added `level`/`peak`; added `transpose` |
| ENVELOPE | 0.5.7, 0.5.5, 0.5.4, 0.5.0 | `gate` ↔ `hold` naming oscillation |
| VCA | 0.5.7, 0.5.5, 0.5.4, 0.5.0 | Same gate/hold pattern as envelope |
| SEQUENCER | 0.5.8, 0.5.1, 0.5.0 | Added `slide`; expanded 8→16 steps |
| FILTER | 0.5.12, 0.5.11, 0.5.0 | Added `transpose` |
| MIDI_CC | 0.5.9, 0.5.0 | Added `channel` |
| NOISE | 0.5.13, 0.5.0 | Added `level` |
| Others | 0.5.0 only | Single version, no upgrades |

**Upgrade Chain** (`app/shared/src/upgrade/`):
1. `upgradePatchState` (from `patch-state.ts`) — Upgrades patch-level state, then `upgradeConnectionsState`, then per-module upgrades
2. `upgradeConnectionsState` — Renames connectors, wraps connection format
3. `upgradeModule` — Dispatches to per-module upgrade function via `upgradeMap` in `module/index.ts`

**Version Arrays**: `PATCH_STATE_VERSIONS`, `CONNECTIONS_STATE_VERSIONS`, `APP_STATE_VERSIONS`, and per-module `*_VERSIONS` arrays track all known versions. The first element is always the latest.

No downgrade functions exist — state can only be upgraded, not downgraded.

## Component File Organization

```
app/web/src/lib/patch/
├── api/                 # API client functions (fetch wrappers)
├── audio/
│   ├── nodes/           # Audio node wrappers (16 modules + factory = 17 files)
│   │   ├── oscillator.ts
│   │   ├── filter.ts
│   │   └── ...
│   │
│   └── processors/      # AudioWorkletProcessors (9 .js + index.ts for registration)
│       ├── adsr.js
│       ├── adsr-clock
│       ├── gate.js
│       └── ...
│
├── components/
│   ├── editor/          # Canvas backdrop, connections, overview, add-module
│   ├── module/          # UI component per module type + useNode + useEffectOnce
│   │   ├── index.tsx    # ModuleUi switch + ModuleWrapper
│   │   ├── oscillator.tsx
│   │   ├── filter.tsx
│   │   ├── use-node.ts
│   │   └── use-effect-once.ts
│   ├── module-ui/       # Shared UI components
│   │   ├── io-connectors.tsx    # Input/output section renderer
│   │   ├── io-connector.tsx     # Individual connector button
│   │   ├── number-parameter.tsx # Number parameter input
│   │   ├── radio-parameter.tsx  # Radio parameter input
│   │   └── ...
│   └── toolbar/         # Record toolbar, etc.
│
├── constants/           # CONSTANTS, MODULE_COLORS etc.
├── contexts/            # React contexts
├── midi/                # MIDI handling
└── state/               # Reducers, selectors, patch state management
```

**UI Components** (`components/module/`): One React component per module type. Each renders:
- Module name (editable)
- Parameters using `NumberParameter`, `RadioParameter`, `NumberBox` (from `module-ui/`)
- `IoConnectors` for input/output ports (from `module-ui/`)

**`ModuleUi`** (`components/module/index.tsx`): Switch component rendering the correct UI by `ModuleType`. Co-located with `ModuleWrapper` which handles drag/drop, selection state, and canvas positioning.

**`AddModule`** (`components/editor/add-module.tsx`): Dropdown for adding modules by category (Sounds, Effects, Control/I/O).

**Shared Utils** (`app/web/src/lib/shared/utils/`): `useRefBackedState`, `useSyncedRef`, `useSyncedUpdateRef` and other utilities.

## Audio Node Wrappers

Located in `app/web/src/lib/patch/audio/nodes/`. 16 module wrappers plus `audio-worklet-node-factory.ts`.

Naming convention: lowercase kebab-case matching the module type identifier. Examples: `oscillator.ts`, `filter.ts`, `midi-cc.ts`.

Each wrapper:
- Maps module state fields to Web Audio API `AudioParam` values
- Manages input connections (wires upstream output to `AudioParam` or audio input)
- Handles cleanup on disconnection

**Web Audio API mapping examples**:
- OSCILLATOR → `OscillatorNode` (`frequency`, `detune`, `type`)
- FILTER → `BiquadFilterNode` (`frequency`, `Q`, `detune`, `type`)
- GAIN → `GainNode` (`gain`)
- DELAY → `DelayNode` (`delayTime`)
- COMPRESSOR → `DynamicsCompressorNode` (`attack`, `release`, `ratio`, `threshold`, `knee`)
- PAN → `StereoPannerNode` (`pan`)

## AudioWorkletProcessors

Located in `app/web/src/lib/patch/audio/processors/`. 9 `.js` files plus `index.ts` for registration.

Plain JavaScript only (AudioWorklet restriction prevents TypeScript). Each processor requires sample-accurate processing that can't be achieved with K-rate `AudioParam`.

**Actual processors**:
- `adsr.js` — ADSR envelope value computation
- `clock.js` — Clock tick generation
- `gate.js` — Gate signal processing
- `limiter.js` — Sample-accurate limiting
- `midi-cc.js` — MIDI CC value tracking
- `midi-clock.js` — MIDI clock pulse handling
- `noise.js` — Noise value generation
- `sequencer.js` — Step sequencer scheduling
- `shift.js` — Value range mapping

Some processors have subdirectories (e.g., `adsr-clock/`) containing additional supporting files.

State updates sent via `this.port.postMessage(state)` from the node wrapper. Processors read state and process audio buffer sample-by-sample in `process(renderable, inputs, outputs)`.

## Custom Hooks

**`useNode(NodeType, state, audioContext)`** (`components/module/use-node.ts`): Core hook for audio node lifecycle.
- Creates appropriate audio node wrapper on mount
- Syncs node parameters when `state` changes
- Disconnects and cleans up on unmount or type change

**`useRefBackedState(initialValue)`** (`lib/shared/utils/`): Returns `[ref, state, setState]` triple. Provides both stable refs (for callbacks) and reactive state (for rendering).

**`useSyncedRef(value)`** (`lib/shared/utils/`): Keeps a ref in sync with a memoized value. Avoids stale closures in callbacks.

**`useSyncedUpdateRef(value)`** (`lib/shared/utils/`): Variant that only updates ref on value changes (shallow comparison).

**`useEffectOnce(fn)`** (`components/module/use-effect-once.ts`): Effect that runs only on mount (not on unmount or re-renders).

## Adding a New Module

Follow this checklist to add a new module type:

1. **Define the enum value** — Add to `ModuleType` in `app/shared/src/types/patch/module/index.ts`

2. **Create the state type** — Create `app/shared/src/types/patch/module/your-module.ts`:
   - State interface with `version` field
   - Version array (e.g., `YOUR_MODULE_STATE_VERSIONS = ["0.5.14"]`)
   - Default state object

3. **Add to shared exports** — Register in `app/shared/src/types/patch/module/index.ts`:
   - Type import and union member
   - `DefaultModuleStates[yourType]` entry
   - Version array export

4. **Create upgrade function** — `app/shared/src/upgrade/module/your-module.ts`:
   - `needsUpgrade(currentVersion)` check
   - `upgrade(state)` function (even if no-op for first version)

5. **Register in upgrade map** — Add to `upgradeMap` in `app/shared/src/upgrade/module/index.ts`

6. **Create audio node wrapper** — `app/web/src/lib/patch/audio/nodes/your-module.ts`:
   - Maps state to Web Audio API params
   - Handles input/output connections
   - Naming: lowercase kebab-case (no `Node` suffix)

7. **Create AudioWorkletProcessor** (if needed) — `app/web/src/lib/patch/audio/processors/your-module.js`:
   - Only if sample-accurate processing is required
   - Plain JavaScript (no TypeScript)
   - Register in `processors/index.ts`

8. **Create React component** — `app/web/src/lib/patch/components/module/your-module.tsx`:
   - Parameter inputs, sliders, connectors
   - Use `NumberParameter`, `RadioParameter`, `NumberBox` from `module-ui/`
   - Call `useNode` hook for audio lifecycle

9. **Register in ModuleUi** — Add case to switch in `components/module/index.tsx`

10. **Add to dropdown** — Include in `components/editor/add-module.tsx` under the appropriate category

11. **Update version tracking** — Add to `APP_STATE_VERSIONS` if introducing breaking changes

After implementation, test by:
- Starting dev server and adding the module to a patch
- Verifying audio output and parameter changes
- Creating/saving/loading a patch with the new module (tests versioning)
