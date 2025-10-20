class MidiClock extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 },
			{ name: 'tick', defaultValue: 1, minValue: -1, maxValue: 1 },
		];
	}

	constructor() {
		super();
	}

	tick = 1;

	process(_, outputs, parameters) {
		const active = parameters.active;
		const isActiveConstant = active.length === 1;

		if (isActiveConstant && active[0] === 0) {
			return false;
		}

		const output = outputs[0];

		const tick = parameters.tick;
		const isTickConstant = tick.length === 1;

		if (isTickConstant && tick[0] === this.tick) {
			return true;
		}

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			let sendTick = false;
			const frameTick = isTickConstant ? tick[0] : tick[i];
			if (this.tick !== frameTick) {
				this.tick = frameTick;
				sendTick = !!frameTick;
			}

			const frameValue = sendTick ? 1 : 0;
			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = frameValue;
			}
		}

		return true;
	}
}

registerProcessor('midi-clock', MidiClock);
