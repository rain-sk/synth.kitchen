# Synth Kitchen - [synth.kitchen](https://synth.kitchen)

In-browser modular synthesis with Web Audio and Web MIDI.

## Plans

### Drag-And-Drop Canvas

The GUI should be inviting and feel natural.

Done:

- [x] don't spam requestAnimationFrame
- [x] stop the viewport from growing for no apparent reason
- [x] support undo/redo of patch state changes (modules, connections, name)
- [x] newly-added modules' names are based on the type of module
- [x] adjust the viewport size to something reasonable during drag-continue and drag-end events

TODO:

- [ ] newly-added modules are positioned "meaningfully" (try to avoid overlaps, aim for the center of the viewport)
- [ ] modify the existing selection properly when using shift+drag
- [ ] scroll when dragging a module past the edge of the viewport
- [ ] infinite-scroll zoomable module canvas

### Keyboard Nav

Done:

- [x] Some way to move selection from module to module using only the keyboard
- [x] modules can be deleted with the keyboard
- [x] Some way to go in-to/out-of a module's controls

TODO:

- [ ] A way to navigate structurally, based on existing connections
- [ ] A way to navigate independent of structure/tab-order (search?)

### Module UIs

Done:

- [x] modules have names
- [x] K-rate audio params have a relevant input
- [x] A-rate audio params have a connector, text-input, and slider
- [x] signal-flow is represented as left-to-right

Stretch Goals:

- [ ] modules can be renamed
- [ ] modules look nice
- [ ] sequencer is cool
- [ ] modules have colors and can be re-colored

### Connections

Done:

- [x] a way to connect/disconnect modules with the mouse
- [x] a way to connect/disconnect modules with the keyboard

Stretch Goals:

- [ ] undo/redo takes connections into account
- [ ] connector inputs have some kind of gain control
- [ ] connection ports/cables give some visual feedback of what's passing through them

### Saving/Loading

Done:

- [x] export/import files containing JSON-stringified IState.modules

TODO:

- [ ] export/import files including connection state
- [ ] catch and handle parse errors
- [ ] catch and handle a potentially-malformed state
- [ ] ability define custom modules based on sub-patches

### MIDI

TODO:

- [ ] MidiDevice module
- [ ] MidiOscillator module
- [ ] MidiEnvelope module
- [ ] MidiSequencer module
- [ ] MidiSequencer module can output to external devices (latency compensation?)

### Global Sync

Done:

- [x] some way™️ to sync sequencers, envelopes, etc.

TODO:

- [ ] sync with external MIDI clocks
- [ ] Ableton Link support
