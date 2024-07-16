function calcPhase(phase, ticksPerMinute) {
	const ticksPerSecond = ticksPerMinute / 60;
	const framesPerTick = sampleRate / ticksPerSecond;
	const phaseOffsetPerFrame = 1 / framesPerTick;
	return phase + Math.abs(phaseOffsetPerFrame);
}

class MidiClock extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 }];
	}

	tickNext = false;

	constructor() {
		super();
		this.port.onmessage = (event) => {
			if (event.data === 'tick') {
				this.tickNext = true;
			} else if (event.data === 'start') {
				this.tickNext = true;
			} else if (event.data === 'stop') {
				this.tickNext = false;
			}
		};
	}

	process(_, outputs, parameters) {
		const active = parameters.active;
		const isActiveConstant = active.length === 1;

		if (isActiveConstant && active[0] === 0) {
			return false;
		}

		const output = outputs[0];

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			const frameValue = this.tickNext ? 1 : 0;
			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = frameValue;
			}

			if (this.tickNext) {
				this.tickNext = false;
			}
		}

		return true;
	}
}

registerProcessor('midi-clock', MidiClock);
