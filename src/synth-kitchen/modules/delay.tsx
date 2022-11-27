import React, { useEffect, useState, useRef } from 'react';

import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useDispatchContext } from '../contexts/dispatch';

import { actions } from '../state/actions';
import { IModule, IModuleState } from '../state/types/module';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>
): IModuleState['DELAY'] => ({
	delayTime: node.delayTime.value
});

const initDelayState = (
	delay: React.MutableRefObject<IDelayNode<IAudioContext> | undefined>,
	state?: IModuleState['DELAY']
) => {
	delay.current = audioContext.createDelay();
	if (state) {
		delay.current.delayTime.setTargetAtTime(
			state.delayTime,
			audioContext.currentTime,
			3
		);
		return state;
	} else {
		return delayStateFromNode(delay.current);
	}
};

export const DelayModule: React.FC<{ module: IModule<'DELAY'> }> = ({
	module
}) => {
	const delay = useRef<IDelayNode<IAudioContext>>();
	const [state /*setState*/] = useState<IModuleState['DELAY']>(
		initDelayState(delay, module.state)
	);

	const dispatch = useDispatchContext();

	useEffect(() => {
		if (state) {
			dispatch(actions.updateModuleStateAction(module.moduleKey, state));
		}
	}, [state]);

	const enabled = state != undefined;

	return enabled ? <p>{module.name}</p> : <p>loading...</p>;
};
