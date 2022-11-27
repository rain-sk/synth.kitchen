import React, { useRef } from 'react';

import { IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';

const oscillatorStateFromNode = (
	node: IOscillatorNode<IAudioContext>
): IModuleState['OSCILLATOR'] => ({
	frequency: node.frequency.value,
	detune: node.detune.value,
	waveform: node.type
});

const initOscillatorState = (
	oscillatorRef: React.MutableRefObject<
		IOscillatorNode<IAudioContext> | undefined
	>,
	state?: IModuleState['OSCILLATOR']
) => {
	oscillatorRef.current = audioContext.createOscillator();
	oscillatorRef.current.start();

	oscillatorRef.current.connect(audioContext.destination);

	if (state) {
		oscillatorRef.current.detune.setTargetAtTime(
			state.detune,
			audioContext.currentTime,
			3
		);
		oscillatorRef.current.frequency.setTargetAtTime(
			state.frequency,
			audioContext.currentTime,
			3
		);
		oscillatorRef.current.type = state.waveform;

		return state;
	} else {
		return oscillatorStateFromNode(oscillatorRef.current);
	}
};

export const OscillatorModule: React.FC<{ module: IModule<'OSCILLATOR'> }> = ({
	module
}) => {
	const oscillatorRef = useRef<IOscillatorNode<IAudioContext>>();
	const [state, setState] = useModuleState<'OSCILLATOR'>(
		initOscillatorState(oscillatorRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
