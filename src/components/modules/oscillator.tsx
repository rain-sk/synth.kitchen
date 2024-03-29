import React, { useCallback, useRef } from 'react';
import {
	IAudioContext,
	IAudioParam,
	IOscillatorNode
} from 'standardized-audio-context';

import { audioContext } from '../../audio/context';

import { useEffectOnce } from '../../hooks/use-effect-once';
import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';

import { NumberParameter } from '../number-parameter';
import { IoConnectors } from '../io-connectors';
import { RadioParameter } from '../radio-parameter';

const oscillatorStateFromNode = (
	node: IOscillatorNode<IAudioContext>
): IModuleState['OSCILLATOR'] => ({
	frequency: node.frequency.value,
	detune: node.detune.value,
	waveform: node.type
});

const initOscillator = (
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
	const oscillatorRef = useRef<IOscillatorNode<IAudioContext>>();
	const [state, setState] = useModuleState<'OSCILLATOR'>(
		() => initOscillator(oscillatorRef, module.state),
		module.moduleKey
	);

	useEffectOnce(() => {
		oscillatorRef.current?.start();

		return () => {
			oscillatorRef.current?.stop();
		};
	});

	const commitFrequencyChange = useCallback(
		(frequency: number) => {
			oscillatorRef.current?.frequency.linearRampToValueAtTime(
				frequency,
				audioContext.currentTime
			);
			setState({
				...state,
				frequency
			});
		},
		[oscillatorRef.current, audioContext, state]
	);

	const commitDetuneChange = useCallback(
		(detune: number) => {
			oscillatorRef.current?.detune.linearRampToValueAtTime(
				detune,
				audioContext.currentTime
			);
			setState({
				...state,
				detune
			});
		},
		[audioContext, state]
	);

	const commitWaveformChange = useCallback(
		(type: string) => {
			if (oscillatorRef.current) {
				const waveform = type as OscillatorType;
				oscillatorRef.current.type = waveform;
				setState({
					...state,
					waveform
				});
			}
		},
		[audioContext, state]
	);

	const frequencyAccessor = useCallback(() => {
		return oscillatorRef.current?.frequency as IAudioParam;
	}, []);
	const detuneAccessor = useCallback(() => {
		return oscillatorRef.current?.detune as IAudioParam;
	}, []);

	const enabled = state != undefined && oscillatorRef.current;

	const output = useCallback(() => oscillatorRef.current as any, [enabled]);

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
