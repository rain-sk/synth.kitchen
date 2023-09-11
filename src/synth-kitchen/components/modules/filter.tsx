import React, { useCallback, useRef } from 'react';

import {
	IAudioContext,
	IAudioParam,
	IBiquadFilterNode,
	TBiquadFilterType
} from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { RadioParameter } from '../radio-parameter';

const filterStateFromNode = (
	filter: IBiquadFilterNode<IAudioContext>
): IModuleState['FILTER'] => ({
	frequency: filter.frequency.value,
	detune: filter.detune.value,
	Q: filter.Q.value,
	gain: filter.gain.value,
	type: filter.type
});

const initFilter = (
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
		filterRef.current.type = state.type;
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
		() => initFilter(filterRef, module.state),
		module.moduleKey
	);

	const commitFrequencyChange = useCallback(
		(frequency: number) => {
			filterRef.current?.frequency.linearRampToValueAtTime(
				frequency,
				audioContext.currentTime
			);
			setState({
				...state,
				frequency
			});
		},
		[filterRef.current, audioContext, state]
	);

	const commitDetuneChange = useCallback(
		(detune: number) => {
			filterRef.current?.detune.linearRampToValueAtTime(
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

	const commitTypeChange = useCallback(
		(type: string) => {
			if (filterRef.current) {
				filterRef.current.type = type as TBiquadFilterType;
				setState({
					...state,
					type: type as TBiquadFilterType
				});
			}
		},
		[audioContext, state]
	);

	const commitQChange = useCallback(
		(Q: number) => {
			filterRef.current?.Q.linearRampToValueAtTime(Q, audioContext.currentTime);
			setState({
				...state,
				Q
			});
		},
		[audioContext, state]
	);

	const commitGainChange = useCallback(
		(gain: number) => {
			filterRef.current?.gain.linearRampToValueAtTime(
				gain,
				audioContext.currentTime
			);
			setState({
				...state,
				gain
			});
		},
		[audioContext, state]
	);

	const frequencyAccessor = useCallback(() => {
		return filterRef.current?.frequency as IAudioParam;
	}, []);

	const detuneAccessor = useCallback(() => {
		return filterRef.current?.detune as IAudioParam;
	}, []);

	const qAccessor = useCallback(() => {
		return filterRef.current?.Q as IAudioParam;
	}, []);

	const gainAccessor = useCallback(() => {
		return filterRef.current?.gain as IAudioParam;
	}, []);

	const enabled = state != undefined;

	const inputAccessor = useCallback(() => filterRef.current as any, [enabled]);

	const outputAccessor = useCallback(() => filterRef.current as any, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={[inputAccessor]}
				outputAccessors={[outputAccessor]}
			/>

			<section>
				<RadioParameter
					moduleKey={module.moduleKey}
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
						'peaking'
					]}
					commitValueCallback={commitTypeChange}
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
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={qAccessor}
					name="Q"
					value={state.Q}
					commitValueCallback={commitQChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={gainAccessor}
					name="gain"
					value={state.gain}
					commitValueCallback={commitGainChange}
				/>
			</section>
		</>
	) : null;
};
