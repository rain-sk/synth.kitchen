class Limiter extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 }];
	}

	process(inputs, outputs, parameters) {
		const active = parameters.active;
		const isActiveConstant = active.length === 1;

		if (isActiveConstant && active[0] === 0) {
			return false;
		}

		const input = inputs[0];
		const hasInput = input.length > 0;

		if (hasInput) {
			const output = outputs[0];

			for (let i = 0; i < output[0].length; i++) {
				if (!isActiveConstant && active[i] === 0) {
					return false;
				}

				for (let channel = 0; channel < output.length; channel++) {
					output[channel][i] = Math.min(
						0.93,
						Math.max(-0.93, input[channel][i])
					);
				}
			}
		}

		return true;
	}
}

registerProcessor('limiter', Limiter);
