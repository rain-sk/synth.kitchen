import React, { useContext, useRef } from 'react';

import { IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';
import { ModuleContext } from '../contexts/module';

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

	if (state) {
		oscillatorRef.current.detune.setValueAtTime(
			state.detune,
			audioContext.currentTime
		);
		oscillatorRef.current.frequency.setValueAtTime(
			state.frequency,
			audioContext.currentTime
		);
		oscillatorRef.current.type = state.waveform;
	} else {
		state = oscillatorStateFromNode(oscillatorRef.current);
	}

	return state;
};

export const OscillatorModule: React.FC<{ module: IModule<'OSCILLATOR'> }> = ({
	module
}) => {
	const { setOutputAccessor, setParamAccessor } = useContext(ModuleContext);

	const oscillatorRef = useRef<IOscillatorNode<IAudioContext>>();
	const [state, setState] = useModuleState<'OSCILLATOR'>(
		() => initOscillatorState(oscillatorRef, module.state),
		module.moduleKey
	);

	useEffectOnce(() => {
		oscillatorRef.current?.start();
		oscillatorRef.current?.connect(audioContext.destination);

		setOutputAccessor((key) => {
			switch (key) {
				case 'out':
					return oscillatorRef.current;
			}
		});

		setParamAccessor((key) => {
			switch (key) {
				case 'frequency':
					return oscillatorRef.current?.frequency;
				case 'detune':
					return oscillatorRef.current?.detune;
			}
		});

		return () => {
			oscillatorRef.current?.stop();
			oscillatorRef.current?.disconnect(audioContext.destination);
		};
	});

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
