# Synth Kitchen - [synth.kitchen](https://synth.kitchen)
In-browser modular synthesis with Web Audio and Web MIDI.

# Why program synthesizers in the browser?
Because modular synthesizers are expensive, and Web Audio makes generating and processing audio possible anywhere you have a computer with a modern browser.

# Project goals
Synth Kitchen is built to provide newcomers to modular synthesis with a simple-to-understand interface for learning about and experimenting with synthesizers and the principles of modular synthesis. It is also built to be used by musicians and synth programmers.

Short-Term Roadmap:
- [ ] Single `Module` component, with specific behavior defined by an object generated based on the props.type
- [ ] Web MIDI Support
- + [x] noteon/noteoff to control modules
- + [ ] control-change (cc) to control module parameters
- + [ ] sequencer module with accurate global timing and sync with exteral hardware/software
- [ ] Serializable / Deserializable State - enable import / export of synth configurations in json
- [ ] Accessibility
- + [ ] Screen Readers - highly descriptive labels for UI elements
- + [ ] Keyboard Users - intuitive, functional UI for keyboard users ( [shift +] tab, space, enter, arrow keys )

Pipe Dreams:
* Database Integration - add user system with support for saving and sharing synth configurations
* Users can define their own modules, using the patch editor to combine existing modules and expose parameters
* Incorporate Tone.js instruments and effects as modules [pending `standardized-audio-context` integration]
* Recording and downloading sounds produced in the app
* Support samplers (AudioBufferNode or uploaded mp3 / ogg) to produce music using existing sounds
* Record samples via microphone and loop / process them in real time
