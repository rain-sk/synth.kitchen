// TODO:
// [ ] stop relying on currentTime; count the number of frames and multiply that by the framerate

function interpolate(a, d, s, r, framesSinceTickStart, framesSinceTickEnd) {
	const noteOn = framesSinceTickStart !== -1;

	if (noteOn) {
		const timeSinceTickStart = framesSinceTickStart / sampleRate;

		if (a > 0 && timeSinceTickStart <= a) {
			return timeSinceTickStart / a;
		} else if (d > 0 && timeSinceTickStart <= a + d) {
			const decayTimeElapsed = timeSinceTickStart - a;
			const decayRatio = d === 0 ? 1 : decayTimeElapsed / d;
			return 1 - decayRatio * (1 - s);
		} else {
			return s;
		}
	} else if (framesSinceTickEnd !== -1) {
		const timeSinceTickEnd = framesSinceTickEnd / sampleRate;
		const releaseRatio = r === 0 ? 1 : timeSinceTickEnd / r;
		return Math.max(s - releaseRatio * s, 0);
	}
	return 0;
}

class Adsr extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'attack', defaultValue: 0, minValue: 0, maxValue: 60 },
			{ name: 'decay', defaultValue: 0, minValue: 0, maxValue: 60 },
			{ name: 'sustain', defaultValue: 1, minValue: 0, maxValue: 1 },
			{ name: 'release', defaultValue: 0.1, minValue: 0, maxValue: 60 }
		];
	}

	lastFrame = 0;

	framesSinceTickStart = -1;
	framesSinceTickEnd = -1;

	process(inputs, outputs, parameters) {
		const input = inputs[0];
		const hasInput = input.length > 0;

		if (!hasInput) {
			return true;
		}

		const output = outputs[0];

		let lastFrame = this.lastFrame;

		let framesSinceTickStart = this.framesSinceTickStart;
		let framesSinceTickEnd = this.framesSinceTickEnd;

		const attack = parameters.attack;
		const isAttackConstant = attack.length === 1;

		const decay = parameters.decay;
		const isDecayConstant = decay.length === 1;

		const sustain = parameters.sustain;
		const isSustainConstant = sustain.length === 1;

		const release = parameters.release;
		const isReleaseConstant = release.length === 1;

		for (let i = 0; i < output[0].length; i++) {
			const gateOpen = input[0][i] === 1;

			if (gateOpen) {
				framesSinceTickStart++;
				framesSinceTickEnd = -1;
			}

			if (framesSinceTickStart === -1 && framesSinceTickEnd === -1) {
				continue;
			}

			if (!gateOpen) {
				framesSinceTickEnd++;
				framesSinceTickStart = -1;
			}

			const frameRelease = isReleaseConstant ? release[0] : release[i];

			{
				const adsrValue = interpolate(
					isAttackConstant ? attack[0] : attack[i],
					isDecayConstant ? decay[0] : decay[i],
					isSustainConstant ? sustain[0] : sustain[i],
					frameRelease,
					framesSinceTickStart,
					framesSinceTickEnd
				);

				const frameValue = (adsrValue + lastFrame) / 2;

				for (let channel = 0; channel < output.length; channel++) {
					output[channel][i] = frameValue;
				}

				lastFrame = frameValue;
			}

			if (
				framesSinceTickEnd !== -1 &&
				framesSinceTickEnd / sampleRate > frameRelease
			) {
				framesSinceTickStart = -1;
				framesSinceTickEnd = -1;
			}
		}

		this.lastFrame = lastFrame;

		this.framesSinceTickStart = framesSinceTickStart;
		this.framesSinceTickEnd = framesSinceTickEnd;

		return true;
	}
}

registerProcessor('adsr', Adsr);
