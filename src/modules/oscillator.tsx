import * as React from 'react';

class Oscillator {
	node: any; // reference to the connectable node
	name: string = 'Oscillator'; //  used for the UI

	// returns parameter descriptors
	getParameters() {
		return [
			{
				name: 'output',
				type: 'SIGNAL_OUT'
			},
			{
				name: 'frequency',
				type: 'CV_IN',
				defaultValue: 440,
				min: 0,
				max: 20000
			},
			{
				name: 'detune',
				type: 'CV_IN',
				defaultValue: 0,
				min: -100,
				max: 100
			},
			{
				name: 'type',
				type: 'SETTINGS',
				// why not a simple array here
				// and use the display() function
				// for the label in the select?
				options: [
					['sine', 'sin'],
					['triangle', 'tri'],
					['square', 'sqr'],
					['sawtooth', 'saw']
				],
				defaultValue: 'sine'
			}
		];
	}

	//  initialize the audio graph of the module
	// and return the connectable point
	setup(audio: any) {
		// NOTE: audio type should be exported from audio-om
		this.node = audio.node(audio.createOscillator());
		this.node.start();
		return this.node;
	}

	// state here is passed by the system with updated state from UI
	// so we can update our nodes accordingly
	update(state: any) {
		this.node.type = state.type;
		this.node.detune.value = state.detune;
		this.node.frequency.value = state.frequency;
	}

	// TODO: implement the custom render case
	// render({ params, state, update, moduleKey }: any) {
	//   // state is still handled by the module loader
	//   // update callback is passed
	//   // return some jsx
	//   return <>Cool</>
	// }
}

export default Oscillator;
