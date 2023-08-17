import React, { useRef } from 'react';

import { IAudioContext, IGainNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';

const outputStateFromNode = (
	node: IGainNode<IAudioContext>
): IModuleState['OUTPUT'] => ({
	gain: node.gain.value
});

const initOutput = (
	gainRef: React.MutableRefObject<IGainNode<IAudioContext> | undefined>,
	state?: IModuleState['OUTPUT']
) => {
	gainRef.current = audioContext.createGain();
	gainRef.current.connect(audioContext.destination);
	if (state) {
		gainRef.current.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(gainRef.current);
	}
};

export const OutputModule: React.FC<{ module: IModule<'OUTPUT'> }> = ({
	module
}) => {
	const gainRef = useRef<IGainNode<IAudioContext>>();
	const [state] = useModuleState<'OUTPUT'>(
		() => initOutput(gainRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
