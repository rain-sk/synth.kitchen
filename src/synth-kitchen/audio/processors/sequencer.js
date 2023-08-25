const sequence = [0, 200, 400, 500];

class Sequencer extends AudioWorkletProcessor {
	// static get parameterDescriptors() {
	// 	return [{ name: 'tempo', defaultValue: 120, minValue: 0, maxValue: 1000 }];
	// }

	step = -1;

	process(inputs, outputs, parameters) {
		const input = inputs[0];
		const output = outputs[0];

		const channelOneOut = output[0];

		let step = this.step;

		if (input.length === 0) {
			return true;
		}

		for (let i = 0; i < channelOneOut.length; i++) {
			if (input[0][i] === 1) {
				step = (step + 1) % sequence.length;
			}

			if (step >= 0) {
				channelOneOut[i] = sequence[step];
			}
		}

		this.step = step;

		return true;
	}
}

registerProcessor('sequencer', Sequencer);
