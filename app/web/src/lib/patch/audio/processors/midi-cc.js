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
				name: 'min',
				defaultValue: 0,
				minValue: Math.minValue,
				maxValue: Math.maxValue,
			},
			{
				name: 'max',
				defaultValue: 1,
				minValue: Math.minValue,
				maxValue: Math.maxValue,
			},
		];
	}

	constructor() {
		super();
	}

	lastLastFrame = 0;
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

			const min = parameters.min;
			const minIsConstant = min.length === 1;

			const max = parameters.max;
			const maxIsConstant = max.length === 1;

			const frameValue = valueIsConstant ? value[0] : value[i];
			const frameMin = minIsConstant ? min[0] : min[i];
			const frameMax = maxIsConstant ? max[0] : max[i];

			const scaledValue = frameMin + (frameValue / 127) * (frameMax - frameMin);
			const smoothedValue =
				(this.lastLastFrame + this.lastFrame + scaledValue) / 3;

			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = smoothedValue;
			}

			this.lastLastFrame = this.lastFrame;
			this.lastFrame = smoothedValue;
		}

		return true;
	}
}

registerProcessor('midi-cc', MidiCc);
