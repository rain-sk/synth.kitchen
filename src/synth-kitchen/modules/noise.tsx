import React, { useEffect, useRef } from 'react';

import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';

import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';
import { IModule, IModuleState } from '../state/types/module';

const initNoise = (
	noiseRef: React.MutableRefObject<
		IAudioWorkletNode<IAudioContext> | undefined
	>,
	state?: IModuleState['NOISE']
) => {
	noiseRef.current = new (AudioWorkletNode as any)(
		audioContext,
		'noise-processor'
	);
	if (state) {
		return state;
	} else {
		return {};
	}
};

export const NoiseModule: React.FC<{ module: IModule<'NOISE'> }> = ({
	module
}) => {
	const noiseRef = useRef<IAudioWorkletNode<IAudioContext>>();
	const [state] = useModuleState<'NOISE'>(
		() => initNoise(noiseRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined && noiseRef.current;

	useEffect(() => {
		if (enabled) {
			noiseRef.current?.connect(audioContext.destination);
			console.log(noiseRef.current);
			return () => {
				noiseRef.current?.disconnect(audioContext.destination);
			};
		}
	}, [enabled]);

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
