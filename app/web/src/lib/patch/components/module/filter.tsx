import React, { useCallback, useEffect, useRef } from 'react';
import { IAudioParam, TBiquadFilterType } from 'standardized-audio-context';
import {
	FILTER_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { FilterNode } from '../../audio/nodes/filter';

const filterStateFromNode = (filter: FilterNode): ModuleState['FILTER'] => ({
	version: FILTER_STATE_VERSIONS[0],
	transpose: filter.transpose.value,
	frequency: filter.frequency.value,
	detune: filter.detune.value,
	Q: filter.Q.value,
	gain: filter.gain.value,
	type: filter.type,
});

const initFilter = (filter: FilterNode, state?: ModuleState['FILTER']) => {
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
	const { node, state, setState } = useNode<FilterNode, ModuleType.FILTER>(
		module,
		initFilter,
		() => new FilterNode(),
	);

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

	const commitTransposeChange = useCallback(
		(transpose: number) => {
			node.transpose.linearRampToValueAtTime(
				transpose,
				audioContext.currentTime,
			);
			setState({
				...state,
				transpose,
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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.frequency !== node.frequency.value) {
			commitFrequencyChange(module.state.frequency);
		}
		if (module.state.transpose !== node.transpose.value) {
			commitTransposeChange(module.state.transpose);
		}
		if (module.state.detune !== node.detune.value) {
			commitDetuneChange(module.state.detune);
		}
		if (module.state.Q !== node.Q.value) {
			commitQChange(module.state.Q);
		}
		if (module.state.gain !== node.gain.value) {
			commitGainChange(module.state.gain);
		}
		if (module.state.type !== node.type) {
			commitTypeChange(module.state.type);
		}
	}, [
		module.state,
		commitFrequencyChange,
		commitDetuneChange,
		commitTypeChange,
		commitQChange,
		commitGainChange,
	]);

	const frequencyAccessor = useCallback(() => {
		return node.frequency as IAudioParam;
	}, [enabled]);

	const transposeAccessor = useCallback(() => {
		return node.transpose as IAudioParam;
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

	const input = useCallback(() => node.input(), [enabled]);

	const output = useCallback(() => node.output(), [enabled]);

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
					unit="hz"
					commitValueCallback={commitFrequencyChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={transposeAccessor}
					name="transpose"
					value={state.transpose}
					unit="st"
					commitValueCallback={commitTransposeChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={detuneAccessor}
					name="detune"
					value={state.detune}
					unit="ct"
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
