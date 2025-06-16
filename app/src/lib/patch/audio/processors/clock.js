function calcPhase(phase, ticksPerMinute) {
	const ticksPerSecond = ticksPerMinute / 60;
	const framesPerTick = sampleRate / ticksPerSecond;
	const phaseOffsetPerFrame = 1 / framesPerTick;
	return phase + Math.abs(phaseOffsetPerFrame);
}

class Clock extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [
			{ name: 'tempo', defaultValue: 120, minValue: 0, maxValue: 72000000 },
			{ name: 'active', defaultValue: 1, minValue: 0, maxValue: 1 },
		];
	}

	phase = 1;

	process(inputs, outputs, parameters) {
		const active = parameters.active;
		const isActiveConstant = active.length === 1;

		if (isActiveConstant && active[0] === 0) {
			return false;
		}

		const input = inputs[0];
		const hasInput = input.length > 0;

		const output = outputs[0];

		const tempo = parameters.tempo;
		const isTempoConstant = tempo.length === 1;
		let phase = this.phase;

		for (let i = 0; i < output[0].length; i++) {
			if (!isActiveConstant && active[i] === 0) {
				return false;
			}

			phase =
				hasInput && input[0][i] === 1
					? 1
					: calcPhase(phase, isTempoConstant ? tempo[0] : tempo[i]);

			const resetPhase = phase >= 1;
			if (resetPhase) {
				phase -= 1;
			}

			const frameValue = resetPhase ? 1 : 0;
			for (let channel = 0; channel < output.length; channel++) {
				output[channel][i] = frameValue;
			}
		}

		this.phase = phase;

		return true;
	}
}

registerProcessor('clock', Clock);
