import React, { useEffect, useState, useRef } from 'react';

import { IAudioContext, IGainNode } from 'standardized-audio-context';
import { audioContext } from '../audio-context';

import { actions } from '../state/actions';
import { IModule, IModuleState } from '../state/types/module';
import { useDispatchContext } from '../state';

const gainStateFromNode = (
	node: IGainNode<IAudioContext>
): IModuleState['GAIN'] => ({
	gain: node.gain.value
});

const initGainState = (
	gain: React.MutableRefObject<IGainNode<IAudioContext> | undefined>,
	state?: IModuleState['GAIN']
) => {
	gain.current = audioContext.createGain();
	if (state) {
		gain.current.gain.setTargetAtTime(state.gain, audioContext.currentTime, 3);
		return state;
	} else {
		return gainStateFromNode(gain.current);
	}
};

export const GainModule: React.FC<{ module: IModule<'GAIN'> }> = ({
	module
}) => {
	const gain = useRef<IGainNode<IAudioContext>>();
	const [state /*setState*/] = useState<IModuleState['GAIN']>(
		initGainState(gain, module.state)
	);

	const dispatch = useDispatchContext();

	useEffect(() => {
		if (state) {
			dispatch(actions.updateModuleStateAction(module.moduleKey, state));
		}
	}, [state]);

	const enabled = state != undefined;

	return enabled ? (
		<>
			<p>{JSON.stringify(module)}</p>
			<p>{JSON.stringify(state)}</p>
		</>
	) : (
		<p>loading...</p>
	);
};
