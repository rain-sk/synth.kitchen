function calcPhase(phase, ticksPerMinute) {
	const ticksPerSecond = Math.abs(ticksPerMinute) / 60;
	const framesPerTick = sampleRate / ticksPerSecond;
	const phaseOffsetPerFrame = 1 / framesPerTick;
	return phase + phaseOffsetPerFrame;
}

class Sequencer extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'steps', defaultValue: 4, minValue: 2, maxValue: 8 },
			{ name: 'step0', defaultValue: 0 },
			{ name: 'step1', defaultValue: 0 },
			{ name: 'step2', defaultValue: 0 },
			{ name: 'step3', defaultValue: 0 },
			{ name: 'step4', defaultValue: 0 },
			{ name: 'step5', defaultValue: 0 },
			{ name: 'step6', defaultValue: 0 },
			{ name: 'step7', defaultValue: 0 },
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 }
		];
	}

	step = 0;

	process(inputs, outputs, parameters) {
		const active = parameters.active;
		const isActiveConstant = active.length === 1;

		if (isActiveConstant && active[0] === 0) {
			return false;
		}

		const input = inputs[0];
		const output = outputs[0];

		const hasInput = input.length !== 0;

		let step = this.step;

		const steps = parameters.steps;
		const stepsIsConstant = steps.length === 1;

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			const tick = hasInput && input[0][i] === 1;
			if (tick) {
				const frameSteps = Math.min(
					Math.max(2, Math.round(stepsIsConstant ? steps[0] : steps[i])),
					8
				);
				step = (step + 1) % frameSteps;
			}

			const frameValue = (() => {
				switch (step) {
					case 0: {
						const step0 = parameters.step0;
						const step0IsConstant = step0.length === 1;
						return step0IsConstant ? step0[0] : step0[i];
					}
					case 1: {
						const step1 = parameters.step1;
						const step1IsConstant = step1.length === 1;
						return step1IsConstant ? step1[0] : step1[i];
					}
					case 2: {
						const step2 = parameters.step2;
						const step2IsConstant = step2.length === 1;
						return step2IsConstant ? step2[0] : step2[i];
					}
					case 3: {
						const step3 = parameters.step3;
						const step3IsConstant = step3.length === 1;
						return step3IsConstant ? step3[0] : step3[i];
					}
					case 4: {
						const step4 = parameters.step4;
						const step4IsConstant = step4.length === 1;
						return step4IsConstant ? step4[0] : step4[i];
					}
					case 5: {
						const step5 = parameters.step5;
						const step5IsConstant = step5.length === 1;
						return step5IsConstant ? step5[0] : step5[i];
					}
					case 6: {
						const step6 = parameters.step6;
						const step6IsConstant = step6.length === 1;
						return step6IsConstant ? step6[0] : step6[i];
					}
					case 7:
					default: {
						const step7 = parameters.step7;
						const step7IsConstant = step7.length === 1;
						return step7IsConstant ? step7[0] : step7[i];
					}
				}
			})();

			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = frameValue;
			}
		}

		this.step = step;

		return true;
	}
}

registerProcessor('sequencer', Sequencer);
