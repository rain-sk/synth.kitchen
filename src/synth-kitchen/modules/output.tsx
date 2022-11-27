import React, { useEffect, useState, useRef } from 'react';

import { IAudioContext, IGainNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useDispatchContext } from '../contexts/dispatch';

import { actions } from '../state/actions';
import { IModule, IModuleState } from '../state/types/module';

const outputStateFromNode = (
	node: IGainNode<IAudioContext>
): IModuleState['OUTPUT'] => ({
	gain: node.gain.value
});

const initOutputState = (
	gain: React.MutableRefObject<IGainNode<IAudioContext> | undefined>,
	state?: IModuleState['OUTPUT']
) => {
	gain.current = audioContext.createGain();
	gain.current.connect(audioContext.destination);
	if (state) {
		gain.current.gain.setTargetAtTime(state.gain, audioContext.currentTime, 3);
		return state;
	} else {
		return outputStateFromNode(gain.current);
	}
};

export const OutputModule: React.FC<{ module: IModule<'OUTPUT'> }> = ({
	module
}) => {
	const gain = useRef<IGainNode<IAudioContext>>();
	const [state /*, setState*/] = useState<IModuleState['OUTPUT']>(
		initOutputState(gain, module.state)
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
