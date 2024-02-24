import {
	AudioWorkletNode,
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class AdsrNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'adsr'
	) as IAudioWorkletNode<IAudioContext>;

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
		this._node = null as any;
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get attack(): IAudioParam {
		return this._node.parameters.get('attack') as IAudioParam;
	}

	get decay(): IAudioParam {
		return this._node.parameters.get('decay') as IAudioParam;
	}

	get sustain(): IAudioParam {
		return this._node.parameters.get('sustain') as IAudioParam;
	}

	get release(): IAudioParam {
		return this._node.parameters.get('release') as IAudioParam;
	}
}
