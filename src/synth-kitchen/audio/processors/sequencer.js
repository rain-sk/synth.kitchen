class Sequencer extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'steps', defaultValue: 8, minValue: 2, maxValue: 8 },
			{
				name: 'step0',
				defaultValue: 0
			},
			{
				name: 'step1',
				defaultValue: 200
			},
			{
				name: 'step2',
				defaultValue: 400
			},
			{
				name: 'step3',
				defaultValue: 500
			},
			{
				name: 'step4',
				defaultValue: 700
			},
			{
				name: 'step5',
				defaultValue: 900
			},
			{
				name: 'step6',
				defaultValue: 1100
			},
			{
				name: 'step7',
				defaultValue: 1200
			}
		];
	}

	step = -1;

	process(inputs, outputs, parameters) {
		const input = inputs[0];
		const output = outputs[0];

		const channelOneOut = output[0];

		let step = this.step;

		if (input.length === 0) {
			return true;
		}

		const steps = parameters.steps;
		const stepsIsConstant = steps.length === 1;

		for (let i = 0; i < channelOneOut.length; i++) {
			const advanceOneStep = input[0][i] === 1;
			if (advanceOneStep) {
				step = (step + 1) % Math.floor(stepsIsConstant ? steps[0] : steps[i]);
			}

			if (step === 0) {
				const step0 = parameters.step0;
				const step0IsConstant = step0.length === 1;
				channelOneOut[i] = step0IsConstant ? step0[0] : step0[i];
			} else if (step === 1) {
				const step1 = parameters.step1;
				const step1IsConstant = step1.length === 1;
				channelOneOut[i] = step1IsConstant ? step1[0] : step1[i];
			} else if (step === 2) {
				const step2 = parameters.step2;
				const step2IsConstant = step2.length === 1;
				channelOneOut[i] = step2IsConstant ? step2[0] : step2[i];
			} else if (step === 3) {
				const step3 = parameters.step3;
				const step3IsConstant = step3.length === 1;
				channelOneOut[i] = step3IsConstant ? step3[0] : step3[i];
			} else if (step === 4) {
				const step4 = parameters.step4;
				const step4IsConstant = step4.length === 1;
				channelOneOut[i] = step4IsConstant ? step4[0] : step4[i];
			} else if (step === 5) {
				const step5 = parameters.step5;
				const step5IsConstant = step5.length === 1;
				channelOneOut[i] = step5IsConstant ? step5[0] : step5[i];
			} else if (step === 6) {
				const step6 = parameters.step6;
				const step6IsConstant = step6.length === 1;
				channelOneOut[i] = step6IsConstant ? step6[0] : step6[i];
			} else if (step === 7) {
				const step7 = parameters.step7;
				const step7IsConstant = step7.length === 1;
				channelOneOut[i] = step7IsConstant ? step7[0] : step7[i];
			}
		}

		this.step = step;

		return true;
	}
}

registerProcessor('sequencer', Sequencer);
