import React, { useCallback, useEffect, useRef } from 'react';
import {
	IAudioContext,
	IAudioParam,
	IOscillatorNode,
} from 'standardized-audio-context';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { OscillatorNode } from '../../audio/nodes/oscillator';

const oscillatorStateFromNode = (
	node: OscillatorNode,
): ModuleState['OSCILLATOR'] => ({
	version: '0.5.0',
	frequency: node.frequency().value,
	detune: node.detune().value / 100,
	waveform: node.waveform as any,
});

const startOnce =
	(
		self: OscillatorNode & {
			startCalled: boolean;
			oldStart: () => void;
		},
	) =>
	() => {
		if (self.startCalled) {
			return;
		}
		self.startCalled = true;
		self.oldStart();
	};
const replaceStart = (self: OscillatorNode) => {
	if (('startCalled' in self) as any) {
		return;
	}
	(self as any).oldStart = self.start;
	(self as any).start = startOnce(self as any);
};

const initOscillator = (
	oscillator: OscillatorNode,
	state?: ModuleState['OSCILLATOR'],
) => {
	if (!oscillator) {
		throw Error('uninitialized ref');
	}

	if (state) {
		oscillator
			.detune()
			.setValueAtTime(state.detune * 100, audioContext.currentTime);
		oscillator
			.frequency()
			.setValueAtTime(state.frequency, audioContext.currentTime);
		oscillator.waveform = state.waveform;
	} else {
		state = oscillatorStateFromNode(oscillator);
	}

	replaceStart(oscillator);
	oscillator.start();
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
			node
				.frequency()
				.linearRampToValueAtTime(frequency, audioContext.currentTime);
			setState({
				...state,
				frequency,
			});
		},
		[state],
	);

	const commitDetuneChange = useCallback(
		(detune: number) => {
			node
				.detune()
				.linearRampToValueAtTime(detune * 100, audioContext.currentTime);
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
				const waveform = type as any;
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
		if (module.state.detune !== node.detune().value) {
			commitDetuneChange(module.state.detune);
		}
		if (module.state.frequency !== node.frequency().value) {
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
		return node.frequency();
	}, [enabled]);
	const detuneAccessor = useCallback(() => {
		return node.detuneInput();
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
					options={['sawtooth', 'sine', 'square', 'triangle']}
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
					paramAccessor={detuneAccessor}
					name="detune"
					value={state.detune}
					commitValueCallback={commitDetuneChange}
				/>
			</section>
		</>
	) : null;
};
