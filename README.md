# Note
This work is continuing in the [Synth-Kitchen repository](https://github.com/spencerudnick/synth-kitchen).
http://synth.kitchen

MOD SYNTH TODO
* Reusable react components for user interaction with generic audio nodes / node groups.
* Redux container to encapsulate app state.
* "Russian-Doll" style API to allow limitless* nesting of audio nodes. API will:
  - Support a UI for users to construct modules out of "building blocks" (other modules) and save their configurations as JSON / to a web server (firebase?).
  - Support internal IO routes, as well as allowing the user to expose custom input, modulation, parameter, and output connectors to parent modules.
  - Treat a base-level module (oscillator, gain, filter, etc.) the same as a user-constructed module (LFO, noise, etc.) such that they are rendered using the same react components and IO Matrix.
* Repaint IO Matrix on resize (module connectors should be "aware" of their location and be able to "broadcast" it to the matrix at the end of a resize).
* Web MIDI API interface to send note start/stop commands to module groups.
* Internal MIDI API for programming sequences of note / parameter / modulation control.
* Recording and downloading sounds produced in the app.
* Support samplers (AudioBufferNode or uploaded mp3 / ogg) to produce music using existing sounds.
* Record samples and loop them in real time
