import React, { useEffect, useRef, useState } from 'react';

import { IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { audioContext } from '../audio-context';

import { actions } from '../state/actions';
import { IModule, IModuleState } from '../state/types/module';
import { useDispatchContext } from '../state';

const oscillatorStateFromNode = (
	node: IOscillatorNode<IAudioContext>
): IModuleState['OSCILLATOR'] => ({
	frequency: node.frequency.value,
	detune: node.detune.value,
	waveform: node.type
});

const initOscillatorState = (
	oscillator: React.MutableRefObject<
		IOscillatorNode<IAudioContext> | undefined
	>,
	state?: IModuleState['OSCILLATOR']
) => {
	oscillator.current = audioContext.createOscillator();
	oscillator.current.start();

	if (state) {
		oscillator.current.detune.setTargetAtTime(
			state.detune,
			audioContext.currentTime,
			3
		);
		oscillator.current.frequency.setTargetAtTime(
			state.frequency,
			audioContext.currentTime,
			3
		);
		oscillator.current.type = state.waveform;

		return state;
	} else {
		return oscillatorStateFromNode(oscillator.current);
	}
};

export const OscillatorModule: React.FC<{ module: IModule<'OSCILLATOR'> }> = ({
	module
}) => {
	const oscillator = useRef<IOscillatorNode<IAudioContext>>();
	const [state /*setState*/] = useState<IModuleState['OSCILLATOR'] | undefined>(
		initOscillatorState(oscillator, module.state)
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
