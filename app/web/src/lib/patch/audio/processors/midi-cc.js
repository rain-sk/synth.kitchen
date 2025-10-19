function calcPhase(phase, ticksPerMinute) {
	const ticksPerSecond = ticksPerMinute / 60;
	const framesPerTick = sampleRate / ticksPerSecond;
	const phaseOffsetPerFrame = 1 / framesPerTick;
	return phase + Math.abs(phaseOffsetPerFrame);
}

class MidiCc extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 },
			{
				name: 'value',
				defaultValue: 127,
				minValue: 0,
				maxValue: 127,
			},
		];
	}

	constructor() {
		super();
	}

	lastFrame = 0;

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

			const value = parameters.value;
			const valueIsConstant = value.length === 1;

			const frameValue =
				(2 * (valueIsConstant ? value[0] : value[i]) + this.lastFrame) / 3;
			this.lastFrame = frameValue;

			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = frameValue;
			}
		}

		return true;
	}
}

registerProcessor('midi-cc', MidiCc);
