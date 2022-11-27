import React, { useRef } from 'react';

import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>
): IModuleState['DELAY'] => ({
	delayTime: node.delayTime.value
});

const initDelayState = (
	delayRef: React.MutableRefObject<IDelayNode<IAudioContext> | undefined>,
	state?: IModuleState['DELAY']
) => {
	delayRef.current = audioContext.createDelay();
	if (state) {
		delayRef.current.delayTime.setTargetAtTime(
			state.delayTime,
			audioContext.currentTime,
			3
		);
		return state;
	} else {
		return delayStateFromNode(delayRef.current);
	}
};

export const DelayModule: React.FC<{ module: IModule<'DELAY'> }> = ({
	module
}) => {
	const delayRef = useRef<IDelayNode<IAudioContext>>();
	const [state, setState] = useModuleState<'DELAY'>(
		() => initDelayState(delayRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
