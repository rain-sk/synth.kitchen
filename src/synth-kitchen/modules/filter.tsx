import React, { useRef } from 'react';

import { IAudioContext, IBiquadFilterNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';

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
	filterRef: React.MutableRefObject<
		IBiquadFilterNode<IAudioContext> | undefined
	>,
	state?: IModuleState['FILTER']
) => {
	filterRef.current = audioContext.createBiquadFilter();

	if (state) {
		filterRef.current.frequency.setValueAtTime(
			state.frequency,
			audioContext.currentTime
		);
		filterRef.current.detune.setValueAtTime(
			state.detune,
			audioContext.currentTime
		);
		filterRef.current.Q.setValueAtTime(state.Q, audioContext.currentTime);
		filterRef.current.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return filterStateFromNode(filterRef.current);
	}
};

export const FilterModule: React.FC<{ module: IModule<'FILTER'> }> = ({
	module
}) => {
	const filterRef = useRef<IBiquadFilterNode<IAudioContext>>();
	const [state, setState] = useModuleState<'FILTER'>(
		() => initFilterState(filterRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
