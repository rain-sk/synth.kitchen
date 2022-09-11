import React, { useEffect, useState } from 'react';

import { IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { audioContext } from '../audio-context';

import { actions } from '../state/actions';
import { IModule, IModuleState } from '../state/types/module';
import { useDispatch } from '../state';

const oscillatorStateFromNode = (
	node: IOscillatorNode<IAudioContext>
): IModuleState['OSCILLATOR'] => ({
	frequency: node.frequency.value,
	detune: node.detune.value,
	waveform: node.type
});

export const OscillatorModule: React.FC<{ module: IModule<'OSCILLATOR'> }> = ({
	module
}) => {
	const [node] = useState(() => {
		const node = audioContext.createOscillator();
		node.start();
		return node;
	});
	const [state, setState] = useState<IModuleState['OSCILLATOR'] | undefined>(
		module.state
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (node) {
			setState(oscillatorStateFromNode(node));
		}
	}, [node]);

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
