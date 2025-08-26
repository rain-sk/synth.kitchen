import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class SequencerNode {
	private _node = audioWorkletNodeFactory('sequencer');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get steps(): IAudioParam {
		return this._node.parameters.get('steps') as IAudioParam;
	}

	get step0(): IAudioParam {
		return this._node.parameters.get('step0') as IAudioParam;
	}

	get step1(): IAudioParam {
		return this._node.parameters.get('step1') as IAudioParam;
	}

	get step2(): IAudioParam {
		return this._node.parameters.get('step2') as IAudioParam;
	}

	get step3(): IAudioParam {
		return this._node.parameters.get('step3') as IAudioParam;
	}

	get step4(): IAudioParam {
		return this._node.parameters.get('step4') as IAudioParam;
	}

	get step5(): IAudioParam {
		return this._node.parameters.get('step5') as IAudioParam;
	}

	get step6(): IAudioParam {
		return this._node.parameters.get('step6') as IAudioParam;
	}

	get step7(): IAudioParam {
		return this._node.parameters.get('step7') as IAudioParam;
	}

	get step8(): IAudioParam {
		return this._node.parameters.get('step8') as IAudioParam;
	}

	get step9(): IAudioParam {
		return this._node.parameters.get('step9') as IAudioParam;
	}

	get step10(): IAudioParam {
		return this._node.parameters.get('step10') as IAudioParam;
	}

	get step11(): IAudioParam {
		return this._node.parameters.get('step11') as IAudioParam;
	}

	get step12(): IAudioParam {
		return this._node.parameters.get('step12') as IAudioParam;
	}

	get step13(): IAudioParam {
		return this._node.parameters.get('step13') as IAudioParam;
	}

	get step14(): IAudioParam {
		return this._node.parameters.get('step14') as IAudioParam;
	}

	get step15(): IAudioParam {
		return this._node.parameters.get('step15') as IAudioParam;
	}
}
