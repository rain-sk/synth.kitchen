# Synth Kitchen - [synth.kitchen](http://synth.kitchen)
In-browser modular synthesis with the Web Audio API. Partially inspired by Max MSP.

# Why program synthesizers in the browser?
Because modular synthesizers are expensive, and the Web Audio API makes digital audio generation and processing possible anywhere you have a computer with a modern browser.

You can check out [some sounds created with the synth kitchen](https://soundcloud.com/therudnick/sets/synth-kitchen) on [my SoundCloud](https://soundcloud.com/therudnick).

Color Scheme: https://flatuicolors.com/palette/defo

Short-Term Roadmap:
- [x] UI Skeleton - wrapper components with functional styles applied
- [ ] IO Map - visual representation of module connections, updates on scroll
- [ ] Install Sass - extend react-scripts-ts with a sass loader
- [x] App Models
- [ ] Predictable State - with stripped-down flux implementation
- + [ ] Module CRUD
- + [ ] IO CRUD
- + [ ] Extended UI Contexts
- [ ] Accessibility
- + [ ] Screen Readers - highly descriptive labels for UI elements
- + [ ] Keyboard Users - intuitive, functional UI for keyboard users ( [shift +] tab, space, enter, arrow keys )
- [ ] Serializable / Deserializable State - enable import / export of synth configurations in json

Pipe Dreams:
* Database Integration - add user system with support for saving and sharing synth configurations
* "Russian-Doll" style workflow to allow virtually limitless nesting of module and IO arrangements
* Web MIDI API-supporting global transport
* Web MIDI API interface to send commands through the synth
* Web MIDI API mapping to route MIDI signals
* Built-In MIDI Sequencer for looping of note and modulation signals
* Recording and downloading sounds produced in the app
* Support samplers (AudioBufferNode or uploaded mp3 / ogg) to produce music using existing sounds
* Record samples via microphone and loop / process them in real time
