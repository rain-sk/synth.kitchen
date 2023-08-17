import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useRef,
	useState
} from 'react';

import { IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';
import { ModuleContext } from '../contexts/module';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { disableKeyMovementAction } from '../state/actions/disable-key-movement';
import { enableKeyMovementAction } from '../state/actions/enable-key-movement';
import { NumberBox } from '../components/number-box';

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
	const { setOutputAccessor, setParamAccessor } = useContext(ModuleContext);
	const dispatch = useDispatchContext();

	const oscillatorRef = useRef<IOscillatorNode<IAudioContext>>();
	const [state, setState] = useModuleState<'OSCILLATOR'>(
		() => initOscillator(oscillatorRef, module.state),
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

	const enabled = state != undefined;

	return !enabled ? (
		<p>loading...</p>
	) : (
		<>
			<NumberBox
				name="frequency"
				value={state.frequency}
				commitValueCallback={commitFrequencyChange}
			/>
		</>
	);
};
