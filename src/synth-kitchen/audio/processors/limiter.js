class Limiter extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [];
	}

	process(inputs, outputs) {
		const input = inputs[0];
		const hasInput = input.length > 0;

		if (hasInput) {
			const output = outputs[0];

			for (let i = 0; i < output[0].length; i++) {
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
