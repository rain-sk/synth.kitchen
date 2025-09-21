import React, { useCallback } from 'react';
import {
	IAudioContext,
	IAudioParam,
	IBiquadFilterNode,
	TBiquadFilterType,
} from 'standardized-audio-context';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';

const filterStateFromNode = (
	filter: IBiquadFilterNode<IAudioContext>,
): ModuleState['FILTER'] => ({
	version: '0.5.0',
	frequency: filter.frequency.value,
	detune: filter.detune.value,
	Q: filter.Q.value,
	gain: filter.gain.value,
	type: filter.type,
});

const initFilter = (
	filter: IBiquadFilterNode<IAudioContext>,
	state?: ModuleState['FILTER'],
) => {
	if (state) {
		filter.frequency.setValueAtTime(state.frequency, audioContext.currentTime);
		filter.detune.setValueAtTime(state.detune, audioContext.currentTime);
		filter.Q.setValueAtTime(state.Q, audioContext.currentTime);
		filter.gain.setValueAtTime(state.gain, audioContext.currentTime);
		filter.type = state.type;
		return state;
	} else {
		return filterStateFromNode(filter);
	}
};

export const FilterModule: React.FC<{ module: Module<ModuleType.FILTER> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<
		IBiquadFilterNode<IAudioContext>,
		ModuleType.FILTER
	>(module, initFilter, () => audioContext.createBiquadFilter());

	const enabled = state !== undefined;

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

	const commitTypeChange = useCallback(
		(type: string) => {
			if (node) {
				node.type = type as TBiquadFilterType;
				setState({
					...state,
					type: type as TBiquadFilterType,
				});
			}
		},
		[state],
	);

	const commitQChange = useCallback(
		(Q: number) => {
			node.Q.linearRampToValueAtTime(Q, audioContext.currentTime);
			setState({
				...state,
				Q,
			});
		},
		[state],
	);

	const commitGainChange = useCallback(
		(gain: number) => {
			node.gain.linearRampToValueAtTime(gain, audioContext.currentTime);
			setState({
				...state,
				gain,
			});
		},
		[state],
	);

	const frequencyAccessor = useCallback(() => {
		return node.frequency as IAudioParam;
	}, [enabled]);

	const detuneAccessor = useCallback(() => {
		return node.detune as IAudioParam;
	}, [enabled]);

	const qAccessor = useCallback(() => {
		return node.Q as IAudioParam;
	}, [enabled]);

	const gainAccessor = useCallback(() => {
		return node.gain as IAudioParam;
	}, [enabled]);

	const input = useCallback(() => node, [enabled]);

	const output = useCallback(() => node, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>

			<section>
				<RadioParameter
					moduleId={module.id}
					name="type"
					value={state.type}
					options={[
						'allpass',
						'bandpass',
						'highpass',
						'highshelf',
						'lowpass',
						'lowshelf',
						'notch',
						'peaking',
					]}
					commitValueCallback={commitTypeChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={frequencyAccessor}
					name="frequency"
					value={state.frequency}
					commitValueCallback={commitFrequencyChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={detuneAccessor}
					name="detune"
					value={state.detune}
					commitValueCallback={commitDetuneChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={qAccessor}
					name="Q"
					value={state.Q}
					commitValueCallback={commitQChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={gainAccessor}
					name="gain"
					value={state.gain}
					commitValueCallback={commitGainChange}
				/>
			</section>
		</>
	) : null;
};
