function interpolate(
	hold,
	a,
	d,
	s,
	r,
	framesSinceHoldStart,
	framesSinceHoldEnd,
	lastFrame,
) {
	const noteOn = framesSinceHoldStart !== -1 && framesSinceHoldEnd === -1;
	if (noteOn) {
		const timeSinceHoldStart = framesSinceHoldStart / sampleRate;
		if (hold <= 0 && framesSinceHoldStart === 0) {
			return 1;
		} else if (a > 0 && timeSinceHoldStart <= a) {
			return timeSinceHoldStart / a;
		} else if (d > 0 && timeSinceHoldStart <= a + d) {
			const decayTimeElapsed = timeSinceHoldStart - a;
			const decayRatio = d === 0 ? 1 : decayTimeElapsed / d;
			return 1 - decayRatio * (1 - s);
		} else {
			return s;
		}
	} else if (framesSinceHoldEnd !== -1) {
		const timeSinceHoldEnd = framesSinceHoldEnd / sampleRate;
		const releaseRatio = r === 0 ? 1 : timeSinceHoldEnd / r;
		const targetValue = Math.max(s - releaseRatio * s, 0);
		return (targetValue + targetValue + lastFrame) / 3;
	}
	return lastFrame / 3;
}

class Adsr extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'hold', defaultValue: 0, minValue: 0, maxValue: Math.maxValue },
			{ name: 'attack', defaultValue: 0, minValue: 0, maxValue: 60 },
			{ name: 'decay', defaultValue: 0, minValue: 0, maxValue: 60 },
			{ name: 'sustain', defaultValue: 1, minValue: 0, maxValue: 1 },
			{ name: 'release', defaultValue: 0.1, minValue: 0, maxValue: 60 },
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 },
		];
	}

	lastFrame = 0;

	framesSinceHoldStart = -1;
	framesSinceHoldEnd = -1;

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

		let lastFrame = this.lastFrame;

		let framesSinceHoldStart = this.framesSinceHoldStart;
		let framesSinceHoldEnd = this.framesSinceHoldEnd;

		const hold = parameters.hold;
		const isHoldConstant = hold.length === 1;

		const attack = parameters.attack;
		const isAttackConstant = attack.length === 1;

		const decay = parameters.decay;
		const isDecayConstant = decay.length === 1;

		const sustain = parameters.sustain;
		const isSustainConstant = sustain.length === 1;

		const release = parameters.release;
		const isReleaseConstant = release.length === 1;

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			const trigger = input[0][i] === 1;

			const frameHold = isHoldConstant ? hold[0] : hold[i];

			if (trigger) {
				framesSinceHoldStart = 0;
				framesSinceHoldEnd = -1;
			} else if (framesSinceHoldStart >= 0 && framesSinceHoldEnd === -1) {
				if (framesSinceHoldStart / sampleRate < frameHold) {
					framesSinceHoldStart++;
				} else {
					// debugger;
					framesSinceHoldEnd = 0;
				}
			} else if (framesSinceHoldEnd >= 0) {
				framesSinceHoldEnd++;
			}

			if (framesSinceHoldStart === -1 && framesSinceHoldEnd === -1) {
				continue;
			}

			const frameRelease = isReleaseConstant ? release[0] : release[i];
			const frameSustain = Math.max(
				0,
				Math.min(1, isSustainConstant ? sustain[0] : sustain[i]),
			);

			{
				const adsrValue = interpolate(
					frameHold,
					isAttackConstant ? attack[0] : attack[i],
					isDecayConstant ? decay[0] : decay[i],
					frameSustain,
					frameRelease,
					framesSinceHoldStart,
					framesSinceHoldEnd,
				);
				const frameValue = (adsrValue + adsrValue + lastFrame) / 3;

				for (let channel = 0; channel < output.length; channel++) {
					output[channel][i] = frameValue;
				}

				lastFrame = frameValue;
			}

			if (
				framesSinceHoldEnd !== -1 &&
				framesSinceHoldEnd / sampleRate > frameRelease
			) {
				framesSinceHoldStart = -1;
				framesSinceHoldEnd = -1;
			}
		}

		this.lastFrame = lastFrame;

		this.framesSinceHoldStart = framesSinceHoldStart;
		this.framesSinceHoldEnd = framesSinceHoldEnd;

		return true;
	}
}

registerProcessor('adsr', Adsr);
