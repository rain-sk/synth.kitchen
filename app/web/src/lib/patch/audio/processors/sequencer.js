function calcPhase(phase, ticksPerMinute) {
	const ticksPerSecond = Math.abs(ticksPerMinute) / 60;
	const framesPerTick = sampleRate / ticksPerSecond;
	const phaseOffsetPerFrame = 1 / framesPerTick;
	return phase + phaseOffsetPerFrame;
}

function interpolate(frameTarget, lastFrame, framesSinceLastTick, slide) {
	const slideFrames = Math.max(0, slide) * sampleRate;
	const slideFramesRemaining = Math.max(0, slideFrames - framesSinceLastTick);

	if (slideFramesRemaining === 0) {
		return frameTarget;
	}

	const delta = frameTarget - lastFrame;
	const deltaSlice = delta / slideFramesRemaining;
	return lastFrame + deltaSlice;
}

class Sequencer extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'steps', defaultValue: 4, minValue: 2, maxValue: 16 },
			{ name: 'slide', defaultValue: 0 },
			{ name: 'step0', defaultValue: 0 },
			{ name: 'step1', defaultValue: 0 },
			{ name: 'step2', defaultValue: 0 },
			{ name: 'step3', defaultValue: 0 },
			{ name: 'step4', defaultValue: 0 },
			{ name: 'step5', defaultValue: 0 },
			{ name: 'step6', defaultValue: 0 },
			{ name: 'step7', defaultValue: 0 },
			{ name: 'step8', defaultValue: 0 },
			{ name: 'step9', defaultValue: 0 },
			{ name: 'step10', defaultValue: 0 },
			{ name: 'step11', defaultValue: 0 },
			{ name: 'step12', defaultValue: 0 },
			{ name: 'step13', defaultValue: 0 },
			{ name: 'step14', defaultValue: 0 },
			{ name: 'step15', defaultValue: 0 },
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 },
		];
	}

	step = 0;
	lastFrame = 0;
	framesSinceLastTick = -1;

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
		let lastFrame = this.lastFrame;
		let framesSinceLastTick = this.framesSinceLastTick;

		const steps = parameters.steps;
		const stepsIsConstant = steps.length === 1;

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			const tick = hasInput && input[0][i] === 1;
			if (tick) {
				framesSinceLastTick = 0;
				const frameSteps = Math.min(
					Math.max(2, Math.round(stepsIsConstant ? steps[0] : steps[i])),
					8,
				);
				step = (step + 1) % frameSteps;
			} else if (framesSinceLastTick >= 0) {
				framesSinceLastTick++;
			}

			let frameTarget = 0;
			switch (step) {
				case 0: {
					const step0 = parameters.step0;
					const step0IsConstant = step0.length === 1;
					frameTarget = step0IsConstant ? step0[0] : step0[i];
					break;
				}
				case 1: {
					const step1 = parameters.step1;
					const step1IsConstant = step1.length === 1;
					frameTarget = step1IsConstant ? step1[0] : step1[i];
					break;
				}
				case 2: {
					const step2 = parameters.step2;
					const step2IsConstant = step2.length === 1;
					frameTarget = step2IsConstant ? step2[0] : step2[i];
					break;
				}
				case 3: {
					const step3 = parameters.step3;
					const step3IsConstant = step3.length === 1;
					frameTarget = step3IsConstant ? step3[0] : step3[i];
					break;
				}
				case 4: {
					const step4 = parameters.step4;
					const step4IsConstant = step4.length === 1;
					frameTarget = step4IsConstant ? step4[0] : step4[i];
					break;
				}
				case 5: {
					const step5 = parameters.step5;
					const step5IsConstant = step5.length === 1;
					frameTarget = step5IsConstant ? step5[0] : step5[i];
					break;
				}
				case 6: {
					const step6 = parameters.step6;
					const step6IsConstant = step6.length === 1;
					frameTarget = step6IsConstant ? step6[0] : step6[i];
					break;
				}
				case 7: {
					const step7 = parameters.step7;
					const step7IsConstant = step7.length === 1;
					frameTarget = step7IsConstant ? step7[0] : step7[i];
					break;
				}
				case 8: {
					const step8 = parameters.step8;
					const step8IsConstant = step8.length === 1;
					frameTarget = step8IsConstant ? step8[0] : step8[i];
					break;
				}
				case 9: {
					const step9 = parameters.step9;
					const step9IsConstant = step9.length === 1;
					frameTarget = step9IsConstant ? step9[0] : step9[i];
					break;
				}
				case 10: {
					const step10 = parameters.step10;
					const step10IsConstant = step10.length === 1;
					frameTarget = step10IsConstant ? step10[0] : step10[i];
					break;
				}
				case 11: {
					const step11 = parameters.step11;
					const step11IsConstant = step11.length === 1;
					frameTarget = step11IsConstant ? step11[0] : step11[i];
					break;
				}
				case 12: {
					const step12 = parameters.step12;
					const step12IsConstant = step12.length === 1;
					frameTarget = step12IsConstant ? step12[0] : step12[i];
					break;
				}
				case 13: {
					const step13 = parameters.step13;
					const step13IsConstant = step13.length === 1;
					frameTarget = step13IsConstant ? step13[0] : step13[i];
					break;
				}
				case 14: {
					const step14 = parameters.step14;
					const step14IsConstant = step14.length === 1;
					frameTarget = step14IsConstant ? step14[0] : step14[i];
					break;
				}
				case 15:
				default: {
					const step15 = parameters.step15;
					const step15IsConstant = step15.length === 1;
					frameTarget = step15IsConstant ? step15[0] : step15[i];
					break;
				}
			}

			const slide = parameters.slide;
			const slideIsConstant = slide.length === 1;

			const interpolatedFrame = interpolate(
				frameTarget,
				lastFrame,
				framesSinceLastTick,
				slideIsConstant ? slide[0] : slide[i],
			);
			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = interpolatedFrame;
			}
			lastFrame = interpolatedFrame;
		}

		this.step = step;
		this.lastFrame = lastFrame;
		this.framesSinceLastTick = framesSinceLastTick;

		return true;
	}
}

registerProcessor('sequencer', Sequencer);
