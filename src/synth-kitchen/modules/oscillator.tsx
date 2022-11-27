import React, { useRef } from 'react';

import { IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';

const oscillatorNodeMap = new Map<string, IOscillatorNode<IAudioContext>>();

const initOscillator = (moduleKey: string) => {
	const oscillator = audioContext.createOscillator();
	oscillatorNodeMap.set(moduleKey, oscillator);
	return oscillator;
};

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
	moduleKey: string,
	state?: IModuleState['OSCILLATOR']
) => {
	let oscillatorNode = oscillatorNodeMap.get(moduleKey);
	if (!oscillatorNode) {
		oscillatorNode = initOscillator(moduleKey);
	}

	oscillatorRef.current = oscillatorNode;

	if (state) {
		oscillatorNode.detune.setTargetAtTime(
			state.detune,
			audioContext.currentTime,
			3
		);
		oscillatorNode.frequency.setTargetAtTime(
			state.frequency,
			audioContext.currentTime,
			3
		);
		oscillatorNode.type = state.waveform;
	} else {
		state = oscillatorStateFromNode(oscillatorRef.current as any);
	}

	return state;
};

export const OscillatorModule: React.FC<{ module: IModule<'OSCILLATOR'> }> = ({
	module
}) => {
	const oscillatorRef = useRef<IOscillatorNode<IAudioContext>>();
	const [state, setState] = useModuleState<'OSCILLATOR'>(
		() => initOscillatorState(oscillatorRef, module.moduleKey, module.state),
		module.moduleKey
	);

	useEffectOnce(() => {
		oscillatorRef.current?.start();
		oscillatorRef.current?.connect(audioContext.destination);

		return () => {
			oscillatorRef.current?.stop();
			oscillatorRef.current?.disconnect(audioContext.destination);
			oscillatorNodeMap.delete(module.moduleKey);
		};
	});

	const enabled = state != undefined;

	return enabled ? <p>enabled</p> : <p>loading...</p>;
};
