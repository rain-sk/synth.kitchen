class Shift extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{
				name: 'inputMin',
				defaultValue: -1,
				minValue: -99999999999999999999999,
				maxValue: 99999999999999999999999,
			},
			{
				name: 'inputMax',
				defaultValue: 1,
				minValue: -99999999999999999999999,
				maxValue: 99999999999999999999999,
			},
			{
				name: 'outputMin',
				defaultValue: -1,
				minValue: -99999999999999999999999,
				maxValue: 99999999999999999999999,
			},
			{
				name: 'outputMax',
				defaultValue: 1,
				minValue: -99999999999999999999999,
				maxValue: 99999999999999999999999,
			},
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 },
		];
	}

	process(inputs, outputs, parameters) {
		const active = parameters.active;
		const isActiveConstant = active.length === 1;

		if (isActiveConstant && active[0] === 0) {
			return false;
		}

		const input = inputs[0];
		const hasInput = input.length > 0;

		if (!hasInput) {
			return true;
		}

		const output = outputs[0];

		const inputMin = parameters.inputMin;
		const isInputMinConstant = inputMin.length === 1;

		const inputMax = parameters.inputMax;
		const isInputMaxConstant = inputMax.length === 1;

		const outputMin = parameters.outputMin;
		const isOutputMinConstant = outputMin.length === 1;

		const outputMax = parameters.outputMax;
		const isOutputMaxConstant = outputMax.length === 1;

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			const frameInputMin = isInputMinConstant ? inputMin[0] : inputMin[i];
			const frameInputMax = isInputMaxConstant ? inputMax[0] : inputMax[i];
			const frameOutputMin = isOutputMinConstant ? outputMin[0] : outputMin[i];
			const frameOutputMax = isOutputMaxConstant ? outputMax[0] : outputMax[i];

			const frameInputRange = frameInputMax - frameInputMin;
			const frameOutputRange = frameOutputMax - frameOutputMin;

			for (let channel = 0; channel < output.length; channel++) {
				const frameInput = input[channel][i];

				const normalizedFrameInput =
					(frameInput - frameInputMin) / frameInputRange;
				const frameValue =
					normalizedFrameInput * frameOutputRange + frameOutputMin;

				output[channel][i] = frameValue;
			}
		}

		return true;
	}
}

registerProcessor('shift', Shift);
