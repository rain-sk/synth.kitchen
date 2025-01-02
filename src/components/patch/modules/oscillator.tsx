import React, { useCallback } from 'react';
import {
	IAudioContext,
	IAudioParam,
	IOscillatorNode,
} from 'standardized-audio-context';

import { audioContext } from '../../../audio/context';

import { IModule, IModuleState } from '../../../state/types/module';

import { NumberParameter } from '../editor/number-parameter';
import { IoConnectors } from '../editor/io-connectors';
import { RadioParameter } from '../editor/radio-parameter';
import { useNode } from '../../../hooks/use-node';

const oscillatorStateFromNode = (
	node: IOscillatorNode<IAudioContext>,
): IModuleState['OSCILLATOR'] => ({
	frequency: node.frequency.value,
	detune: node.detune.value,
	waveform: node.type,
});

const initOscillator = (
	oscillator: IOscillatorNode<IAudioContext>,
	state?: IModuleState['OSCILLATOR'],
) => {
	if (!oscillator) {
		throw Error('uninitialized ref');
	}

	if (state) {
		oscillator.detune.setValueAtTime(state.detune, audioContext.currentTime);
		oscillator.frequency.setValueAtTime(
			state.frequency,
			audioContext.currentTime,
		);
		oscillator.type = state.waveform;
	} else {
		state = oscillatorStateFromNode(oscillator);
	}

	oscillator.start();
	return state;
};

export const OscillatorModule: React.FC<{ module: IModule<'OSCILLATOR'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<
		IOscillatorNode<IAudioContext>,
		'OSCILLATOR'
	>(module, initOscillator, () => audioContext.createOscillator());

	const commitFrequencyChange = useCallback(
		(frequency: number) => {
			node.frequency.linearRampToValueAtTime(
				frequency,
				audioContext.currentTime,
			);
			setState({
				...state,
				frequency,
			});
		},
		[state],
	);

	const commitDetuneChange = useCallback(
		(detune: number) => {
			node.detune.linearRampToValueAtTime(detune, audioContext.currentTime);
			setState({
				...state,
				detune,
			});
		},
		[state],
	);

	const commitWaveformChange = useCallback(
		(type: string) => {
			if (node) {
				const waveform = type as OscillatorType;
				node.type = waveform;
				setState({
					...state,
					waveform,
				});
			}
		},
		[state],
	);

	const enabled = state != undefined;

	const frequencyAccessor = useCallback(() => {
		return node.frequency as IAudioParam;
	}, [enabled]);
	const detuneAccessor = useCallback(() => {
		return node.detune as IAudioParam;
	}, [enabled]);

	const output = useCallback(() => node, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{}}
				outputAccessors={{ output }}
			/>

			<section>
				<RadioParameter
					moduleKey={module.moduleKey}
					name="waveform"
					value={state.waveform}
					options={['sawtooth', 'sine', 'square', 'triangle']}
					commitValueCallback={commitWaveformChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={frequencyAccessor}
					name="frequency"
					value={state.frequency}
					commitValueCallback={commitFrequencyChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={detuneAccessor}
					name="detune"
					value={state.detune}
					commitValueCallback={commitDetuneChange}
				/>
			</section>
		</>
	) : null;
};
