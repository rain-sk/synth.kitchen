function interpolate(a, d, s, r, tickStart, tickEnd) {
	const noteOn = tickStart !== -1;

	if (noteOn) {
		const timeSinceLastTick = currentTime - tickStart;

		if (a > 0 && timeSinceLastTick <= a) {
			return timeSinceLastTick / a;
		} else if (d > 0 && timeSinceLastTick <= a + d) {
			const decayTimeElapsed = timeSinceLastTick - a;
			const decayRatio = d === 0 ? 1 : decayTimeElapsed / d;
			return 1 - decayRatio * (1 - s);
		} else {
			return s;
		}
	} else {
		const releaseTimeElapsed = currentTime - tickEnd;
		const releaseRatio = r === 0 ? 1 : releaseTimeElapsed / r;
		return Math.max(s - releaseRatio * s, 0);
	}
}

class Adsr extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'attack', defaultValue: 0.1, minValue: 0, maxValue: 60 },
			{ name: 'decay', defaultValue: 0.1, minValue: 0, maxValue: 60 },
			{ name: 'sustain', defaultValue: 0.5, minValue: 0, maxValue: 1 },
			{ name: 'release', defaultValue: 0.1, minValue: 0, maxValue: 60 }
		];
	}

	lastFrame = 0;

	tickStart = -1;
	tickEnd = -1;

	process(inputs, outputs, parameters) {
		const input = inputs[0];
		const hasInput = input.length > 0;

		if (!hasInput) {
			return true;
		}

		const output = outputs[0];

		let lastFrame = this.lastFrame;

		let tickStart = this.tickStart;
		let tickEnd = this.tickEnd;

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

			if (tickStart === -1 && gateOpen) {
				tickStart = currentTime;
				tickEnd = -1;
			}

			if (tickStart !== -1 || tickEnd !== -1) {
				if (tickEnd === -1 && !gateOpen) {
					tickEnd = currentTime;
					tickStart = -1;
				}

				const frameRelease = isReleaseConstant ? release[0] : release[i];

				const frameValue = interpolate(
					isAttackConstant ? attack[0] : attack[i],
					isDecayConstant ? decay[0] : decay[i],
					isSustainConstant ? sustain[0] : sustain[i],
					frameRelease,
					tickStart,
					tickEnd
				);

				for (let channel = 0; channel < output.length; channel++) {
					output[channel][i] = frameValue;
				}

				if (tickEnd !== -1 && currentTime - tickEnd > frameRelease) {
					tickStart = -1;
					tickEnd = -1;
				}
			}
		}

		this.tickStart = tickStart;
		this.tickEnd = tickEnd;

		return true;
	}
}

registerProcessor('adsr', Adsr);
