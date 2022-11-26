# Synth Kitchen - [synth.kitchen](https://synth.kitchen)

In-browser modular synthesis with Web Audio and Web MIDI.

## Plans

### Drag-And-Drop Canvas

The GUI should be inviting and feel natural.

MVP:

- [ ] modify the existing selection properly when using shift+drag
- [ ] stop the viewport from growing for no apparent reason
- [ ] adjust the viewport size to something reasonable during drag-continue and drag-end events
- [ ] scroll when dragging a module past the edge of the viewport
- [ ] handle dragging up/left in a way that feels equivalent as dragging down/right

### Keyboard Nav

Some way to move selection from module to module using only the keyboard...

### Module UIs

MVP:

- [ ] modules have names and can be renamed
- [ ] A-rate audio params have a connector, text-input, and slider
- [ ] K-rate audio params have a relevant input
- [ ] signal-flow is represented as left-to-right

Stretch Goals:

- [ ] sequencer is cool
- [ ] modules look nice
- [ ] modules have colors and can be re-colored

### Connections

MVP:

- [ ] a way to connect/disconnect modules with the mouse
- [ ] a way to connect/disconnect modules with the keyboard

Stretch Goals:

- [ ] connector inputs have some kind of gain control
- [ ] connections give some visual feedback of what's passing through them

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
