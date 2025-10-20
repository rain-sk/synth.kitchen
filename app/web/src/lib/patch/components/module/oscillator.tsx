import React, { useCallback, useEffect, useRef } from 'react';
import {
	Module,
	ModuleState,
	ModuleType,
	OSCILLATOR_STATE_VERSIONS,
} from 'synth.kitchen-shared';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { OscillatorNode } from '../../audio/nodes/oscillator';

const nodeTranspose = (detune: number) => {
	const sign = detune > 0 ? 1 : -1;
	return sign * Math.floor(Math.abs(detune) / 100);
};

const nodeDetune = (detune: number) => {
	const sign = detune > 0 ? 1 : -1;
	return sign * (Math.abs(detune) % 100);
};

const effectiveDetune = (transpose: number, detune: number) =>
	transpose * 100 + detune;

const oscillatorStateFromNode = (
	node: OscillatorNode,
): ModuleState['OSCILLATOR'] => ({
	version: OSCILLATOR_STATE_VERSIONS[0],
	frequency: node.frequency.value,
	transpose: node.transpose.value,
	detune: node.detune.value,
	waveform: node.waveform,
});

const initOscillator = (
	oscillator: OscillatorNode,
	state?: ModuleState['OSCILLATOR'],
) => {
	if (!oscillator) {
		throw Error('uninitialized ref');
	}

	if (state) {
		const computedDetune = effectiveDetune(state.transpose, state.detune);
		const transpose = nodeTranspose(computedDetune);
		const detune = nodeDetune(computedDetune);
		oscillator.transpose.setValueAtTime(transpose, audioContext.currentTime);
		oscillator.detune.setValueAtTime(detune, audioContext.currentTime);
		oscillator.frequency.setValueAtTime(
			state.frequency,
			audioContext.currentTime,
		);
		oscillator.waveform = state.waveform;
	} else {
		state = oscillatorStateFromNode(oscillator);
	}

	return state;
};

export const OscillatorModule: React.FC<{
	module: Module<ModuleType.OSCILLATOR>;
}> = ({ module }) => {
	const { node, state, setState } = useNode<
		OscillatorNode,
		ModuleType.OSCILLATOR
	>(module, initOscillator, () => new OscillatorNode());

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
			let transpose = state.transpose;
			if (
				(detune > 0 !== transpose > 0 && detune !== 0 && transpose !== 0) ||
				Math.abs(detune) >= 100
			) {
				const computedDetune = effectiveDetune(state.transpose, detune);
				transpose = nodeTranspose(computedDetune);
				detune = nodeDetune(computedDetune);
				node.transpose.linearRampToValueAtTime(
					transpose,
					audioContext.currentTime,
				);
				node.detune.linearRampToValueAtTime(detune, audioContext.currentTime);
			} else {
				node.detune.linearRampToValueAtTime(detune, audioContext.currentTime);
			}

			setState({
				...state,
				transpose,
				detune,
			});
		},
		[state],
	);

	const commitWaveformChange = useCallback(
		(waveform: any) => {
			if (node) {
				node.waveform = waveform;
				setState({
					...state,
					waveform,
				});
			}
		},
		[state],
	);

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.transpose !== node.transpose.value) {
			commitTransposeChange(module.state.transpose);
		}
		if (module.state.detune !== node.detune.value) {
			commitDetuneChange(module.state.detune);
		}
		if (module.state.frequency !== node.frequency.value) {
			commitFrequencyChange(module.state.frequency);
		}
		if (module.state.waveform !== node.waveform) {
			commitWaveformChange(module.state.waveform);
		}
	}, [
		module.state,
		commitDetuneChange,
		commitFrequencyChange,
		commitWaveformChange,
	]);

	const enabled = state != undefined;

	const frequencyAccessor = useCallback(() => {
		return node.frequency;
	}, [enabled]);
	const detuneAccessor = useCallback(() => {
		return node.detune;
	}, [enabled]);
	const transposeAccessor = useCallback(() => {
		return node.transpose;
	}, [enabled]);

	const output = useCallback(() => node.output(), [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{}}
				outputAccessors={{ output }}
			/>

			<section>
				<RadioParameter
					moduleId={module.id}
					name="waveform"
					value={state.waveform}
					options={['sine', 'triangle', 'square', 'sawtooth']}
					commitValueCallback={commitWaveformChange}
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
					paramAccessor={transposeAccessor}
					name="transpose"
					value={state.transpose}
					commitValueCallback={commitTransposeChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={detuneAccessor}
					name="detune"
					value={state.detune}
					commitValueCallback={commitDetuneChange}
				/>
			</section>
		</>
	) : null;
};
