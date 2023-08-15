import React, { useRef } from 'react';

import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';

audioContext.audioWorklet.addModule("random-noise-processor.js");

const gainStateFromNode = (
	node: IAudioWorkletNode<IAudioContext>
): IModuleState['GAIN'] => ({
	gain: node.gain.value
});

const initNoiseState = (
	noiseRef: React.MutableRefObject<IAudioWorkletNode<IAudioContext> | undefined>,
	state?: IModuleState['NOISE']
) => {
	noiseRef.current = audioContext.audioWorklet?.addModule('')
	if (state) {
		return state;
	} else {
		return {};
	}
};

export const GainModule: React.FC<{ module: IModule<'NOISE'> }> = ({
	module
}) => {
	const noiseRef = useRef<IAudioWorkletNode<IAudioContext>>();
	const [state, setState] = useModuleState<'NOISE'>(
		() => initNoiseState(noiseRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
