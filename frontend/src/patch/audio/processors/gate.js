function calcPhase(phase, ticksPerMinute) {
	const ticksPerSecond = ticksPerMinute / 60;
	const framesPerTick = sampleRate / ticksPerSecond;
	const phaseOffsetPerFrame = 1 / framesPerTick;
	return phase + Math.abs(phaseOffsetPerFrame);
}

class Gate extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'gate', defaultValue: 0.5, minValue: 0, maxValue: 1 },
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 }
		];
	}

	lastTick = -1;
	lastTickLength = -1;

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
		const channelOne = output[0];

		const gate = parameters.gate;
		const isGateConstant = gate.length === 1;

		let lastTick = this.lastTick;
		let lastTickLength = this.lastTickLength;

		for (let i = 0; i < channelOne.length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			const inputIsTick = input[0][i] === 1;

			if (inputIsTick) {
				if (lastTick !== -1) {
					lastTickLength = currentTime - lastTick;
				}
				lastTick = currentTime;
			}

			if (lastTick !== -1 && lastTickLength !== -1) {
				const frameGate = isGateConstant ? gate[0] : gate[i];
				const timeSinceLastTick = currentTime - lastTick;

				const gateOpen = timeSinceLastTick / lastTickLength < frameGate;

				for (let channel = 0; channel < output.length; channel++) {
					output[channel][i] = gateOpen ? 1 : 0;
				}
			}
		}

		this.lastTick = lastTick;
		this.lastTickLength = lastTickLength;

		return true;
	}
}

registerProcessor('gate', Gate);
