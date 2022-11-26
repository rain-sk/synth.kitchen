import React, { useEffect, useState, useRef } from 'react';

import { IAudioContext, IBiquadFilterNode } from 'standardized-audio-context';
import { audioContext } from '../audio-context';

import { actions } from '../state/actions';
import { IModule, IModuleState } from '../state/types/module';
import { useDispatchContext } from '../state';

const filterStateFromNode = (
	filter: IBiquadFilterNode<IAudioContext>
): IModuleState['FILTER'] => ({
	frequency: filter.frequency.value,
	detune: filter.detune.value,
	Q: filter.Q.value,
	gain: filter.gain.value,
	type: filter.type
});

const initFilterState = (
	filter: React.MutableRefObject<IBiquadFilterNode<IAudioContext> | undefined>,
	state?: IModuleState['FILTER']
) => {
	filter.current = audioContext.createBiquadFilter();

	if (state) {
		filter.current.frequency.setTargetAtTime(
			state.frequency,
			audioContext.currentTime,
			3
		);
		filter.current.detune.setTargetAtTime(
			state.detune,
			audioContext.currentTime,
			3
		);
		filter.current.Q.setTargetAtTime(state.Q, audioContext.currentTime, 3);
		filter.current.gain.setTargetAtTime(
			state.gain,
			audioContext.currentTime,
			3
		);
		return state;
	} else {
		return filterStateFromNode(filter.current);
	}
};

export const FilterModule: React.FC<{ module: IModule<'FILTER'> }> = ({
	module
}) => {
	const filter = useRef<IBiquadFilterNode<IAudioContext>>();
	const [state /*setState*/] = useState<IModuleState['FILTER']>(
		initFilterState(filter, module.state)
	);

	const dispatch = useDispatchContext();

	useEffect(() => {
		if (state) {
			dispatch(actions.updateModuleStateAction(module.moduleKey, state));
		}
	}, [state]);

	const enabled = state != undefined;

	return enabled ? <p>{module.moduleKey}</p> : <p>loading...</p>;
};
