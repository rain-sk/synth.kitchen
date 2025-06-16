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
			{
				name: 'max',
				defaultValue: 1.0,
			},
			{ name: 'min', defaultValue: 0.0 },
		];
	}

	constructor() {
		super();
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

			const value = parameters.value;
			const valueIsConstant = value.length === 1;

			const max = parameters.max;
			const maxIsConstant = max.length === 1;

			const min = parameters.min;
			const minIsConstant = min.length === 1;

			const frameValue = valueIsConstant ? value[0] : value[i];

			const frameMax = maxIsConstant ? max[0] : max[i];

			const frameMin = minIsConstant ? min[0] : min[i];

			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] =
					(frameValue / 127) * (frameMax - frameMin) + frameMin;
			}
		}

		return true;
	}
}

registerProcessor('midi-cc', MidiCc);
