# Synth Kitchen - [synth.kitchen](https://synth.kitchen)
In-browser modular synthesis with Web Audio and Web MIDI.

# Why program synthesizers in the browser?
Because modular synthesizers are expensive, and Web Audio makes generating and processing audio possible anywhere you have a computer with a modern browser.

# Project goals
Synth Kitchen is built to provide newcomers to modular synthesis with a simple-to-understand interface for learning about and experimenting with synthesizers and the principles of modular synthesis. It is also built to be used by musicians and synth programmers.

Roadmap:
- [ ] Serializable / Deserializable State - enable import / export of synth configurations in json
- + [ ] Develop the `aud-io` library to a point where it supports arbitrary import/export
- + [ ] Support custom "composite" nodes (including the ability to port 3rd party nodes)
- [ ] Global timing, to synchronise sequencers and other time-based modules
- [ ] Single `Module` component, which integrates with `aud-io`'s data model
- [ ] Additional Modules
- + [ ] Envelope controlled by noteon/noteoff messages
- [ ] Web MIDI Support
- + [x] noteon/noteoff to control modules
- + [ ] control-change (cc) to control parameters
- + [ ] sync with exteral hardware/software
- [ ] Accessibility
- + [ ] Screen Readers - highly descriptive labels for UI elements
- + [ ] Keyboard Users - intuitive, functional UI for keyboard users ( [shift +] tab, space, enter, arrow keys )
- [ ] User accounts so people can save and share patches

Pipe Dreams:
* Recording and downloading sounds produced in the app
* Support samplers (AudioBufferNode or uploaded mp3 / ogg) to produce music using existing sounds
* Record samples via microphone and loop / process them in real time
