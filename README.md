# Synth Kitchen - [synth.kitchen](https://synth.kitchen)

In-browser modular synthesis with Web Audio and Web MIDI.

## Plans

### Drag-And-Drop Canvas

The GUI should be inviting and feel natural.

MVP:

- [x] don't spam requestAnimationFrame
- [x] stop the viewport from growing for no apparent reason
- [x] support undo/redo of patch state changes (modules, connections, name)
- [ ] newly-added modules are positioned "meaningfully" (try to avoid overlaps, aim for the center of the viewport)
- [x] newly-added modules' names are based on the type of module
- [ ] modify the existing selection properly when using shift+drag
- [ ] adjust the viewport size to something reasonable during drag-continue and drag-end events
- [ ] scroll when dragging a module past the edge of the viewport
- [ ] handle dragging up/left in a way that feels equivalent as dragging down/right

Stretch goals:

- [ ] "smart" undo/redo: don't fill it up with junky intermediate state
- [ ] handle dragging up/left in a way that feels equivalent as dragging down/right

### Keyboard Nav

MVP:

- [x] Some way to move selection from module to module using only the keyboard
- [x] modules can be deleted with the keyboard

Stretch goal:

- [ ] Some way to go in-to/out-of a module's controls
- [ ] A way to navigate structurally, based on existing connections
- [ ] A way to navigate independent of structure/tab-order (search?)

### Module UIs

MVP:

- [x] modules have names
- [ ] modules can be renamed
- [ ] A-rate audio params have a connector, text-input, and slider
- [ ] K-rate audio params have a relevant input
- [ ] signal-flow is represented as left-to-right

Stretch Goals:

- [ ] modules look nice
- [ ] sequencer is cool
- [ ] modules have colors and can be re-colored

### Connections

MVP:

- [ ] a way to connect/disconnect modules with the mouse
- [ ] a way to connect/disconnect modules with the keyboard

Stretch Goals:

- [ ] connector inputs have some kind of gain control
- [ ] connection ports/cables give some visual feedback of what's passing through them

### Saving/Loading

MVP:

- [x] export/import files containing JSON-stringified IState.modules
- [ ] export/import files including connection state
- [ ] catch and handle parse errors
- [ ] catch and handle a potentially-malformed state

Stretch goal:

- [ ] ability define custom modules based on sub-patches

### MIDI

MVP:

- [ ] MidiDevice module
- [ ] MidiOscillator module

Stretch Goals:

- [ ] MidiEnvelope module
- [ ] MidiSequencer module
- [ ] MidiSequencer module can output to external devices (latency compensation?)

### Global Sync

MVP:

- [ ] some way™️ to sync sequencers, envelopes, etc.

Stretch Goals:

- [ ] sync with external MIDI clocks
- [ ] Ableton Link support
