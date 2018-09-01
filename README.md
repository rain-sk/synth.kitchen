# Synth Kitchen
## http://synth.kitchen

In-browser modular synthesis with the Web Audio API.

Short-Term Roadmap:
- [x] UI Skeleton - wrapper components with functional styles applied
- [ ] IO Map - visual representation of module connections, updates on scroll
- [ ] Install Sass - extend react-scripts-ts with a sass loader
- [ ] App Models - define models for racks, modules, IO, etc.
- [ ] UI States - add enum for UI state to SynthKitchen component
- + [ ] "Default" - clean kitchen
- + [ ] IO Context - clean kitchen
- [ ] Predictable State - with stripped-down flux implementation
- + [ ] Rack CRUD
- + [ ] Module CRUD
- + [ ] Modules reliably map to immutable AudioNodes
- + [ ] IO CRUD
- [ ] Accessibility
- + [ ] Screen Readers - highly descriptive labels for UI elements
- + [ ] Keyboard Users - intuitive, functional UI for keyboard users ( [shift +] tab, space, enter, arrow keys )
- [ ] Serializable / Deserializable State - enable import / export of synth configurations in json
- [ ] Database Integration - utilizing the Wordpress REST API as a backend to store serialized configurations

Pipe Dreams:
* Authentication through Wordpress REST API to enable users to make public and private configurations, and share them with friends.
* "Russian-Doll" style UI to allow "limitless" nesting of module and IO arrangements
* Web MIDI API-supported global BPM
* Web MIDI API interface to send pitch, value, and on/off commands to the synth
* Web MIDI API mapping to route MIDI signals
* Built-In MIDI Sequence designer for looping of note and modulation signals
* Recording and downloading sounds produced in the app
* Support samplers (AudioBufferNode or uploaded mp3 / ogg) to produce music using existing sounds
* Record samples and loop them in real time
