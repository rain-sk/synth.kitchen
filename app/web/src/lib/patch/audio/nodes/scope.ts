import { IAudioContext, IAudioNode } from 'standardized-audio-context';

import { audioContext } from '..';
import { Oscilloscope } from '../../components/module-ui/webaudio-oscilloscope';

export class ScopeNode {
	private gain = audioContext.current.createGain();
	private oscilloscope?: Oscilloscope;
	private initialized = false;

	init = (canvas: any) => {
		if (this.initialized) {
			return;
		}
		this.initialized = true;
		this.oscilloscope = new Oscilloscope(
			audioContext.current,
			this.gain,
			canvas,
		);
		this.oscilloscope.start();
	};

	pause = () => {
		if (this.oscilloscope && !this.oscilloscope.isPaused) {
			this.oscilloscope.pause();
		}
	};

	start = () => {
		if (this.oscilloscope && this.oscilloscope.isPaused) {
			this.oscilloscope.start();
		}
	};

	disconnect = () => {
		this.oscilloscope = undefined;
	};

	input = (): IAudioNode<IAudioContext> => this.gain;
	output = (): IAudioNode<IAudioContext> => this.gain;
}
