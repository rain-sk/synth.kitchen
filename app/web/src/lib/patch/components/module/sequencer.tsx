import React, { useCallback } from 'react';
import { IAudioParam } from 'standardized-audio-context';

import { audioContext } from '../../audio';
import { SequencerNode } from '../../audio/nodes/sequencer';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const sequencerStateFromNode = (
	sequencer: SequencerNode,
): IModuleState['SEQUENCER'] => ({
	steps: sequencer.steps.value,
	step0: sequencer.step0.value,
	step1: sequencer.step1.value,
	step2: sequencer.step2.value,
	step3: sequencer.step3.value,
	step4: sequencer.step4.value,
	step5: sequencer.step5.value,
	step6: sequencer.step6.value,
	step7: sequencer.step7.value,
	step8: sequencer.step8.value,
	step9: sequencer.step9.value,
	step10: sequencer.step10.value,
	step11: sequencer.step11.value,
	step12: sequencer.step12.value,
	step13: sequencer.step13.value,
	step14: sequencer.step14.value,
	step15: sequencer.step15.value,
});

const initSequencer = (
	sequencer: SequencerNode,
	state?: IModuleState['SEQUENCER'],
) => {
	if (state) {
		sequencer.steps.setValueAtTime(state.steps, audioContext.currentTime);
		sequencer.step0.setValueAtTime(state.step0, audioContext.currentTime);
		sequencer.step1.setValueAtTime(state.step1, audioContext.currentTime);
		sequencer.step2.setValueAtTime(state.step2, audioContext.currentTime);
		sequencer.step3.setValueAtTime(state.step3, audioContext.currentTime);
		sequencer.step4.setValueAtTime(state.step4, audioContext.currentTime);
		sequencer.step5.setValueAtTime(state.step5, audioContext.currentTime);
		sequencer.step6.setValueAtTime(state.step6, audioContext.currentTime);
		sequencer.step7.setValueAtTime(state.step7, audioContext.currentTime);
		return state;
	} else {
		return sequencerStateFromNode(sequencer);
	}
};

export const SequencerModule: React.FC<{ module: IModule<'SEQUENCER'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<SequencerNode, 'SEQUENCER'>(
		module,
		initSequencer,
		() => new SequencerNode(),
	);

	const commitStepsChange = useCallback(
		(steps: number) => {
			steps = Math.floor(Math.max(2, Math.min(16, steps)));
			node.steps.linearRampToValueAtTime(steps, audioContext.currentTime);
			setState({
				...state,
				steps,
			});
		},
		[state],
	);

	const commitStep0Change = useCallback(
		(step0: number) => {
			node.step0.linearRampToValueAtTime(step0, audioContext.currentTime);
			setState({
				...state,
				step0,
			});
		},
		[state],
	);

	const commitStep1Change = useCallback(
		(step1: number) => {
			node.step1.linearRampToValueAtTime(step1, audioContext.currentTime);
			setState({
				...state,
				step1,
			});
		},
		[state],
	);

	const commitStep2Change = useCallback(
		(step2: number) => {
			node.step2.linearRampToValueAtTime(step2, audioContext.currentTime);
			setState({
				...state,
				step2,
			});
		},
		[state],
	);

	const commitStep3Change = useCallback(
		(step3: number) => {
			node.step3.linearRampToValueAtTime(step3, audioContext.currentTime);
			setState({
				...state,
				step3,
			});
		},
		[state],
	);

	const commitStep4Change = useCallback(
		(step4: number) => {
			node.step4.linearRampToValueAtTime(step4, audioContext.currentTime);
			setState({
				...state,
				step4,
			});
		},
		[state],
	);

	const commitStep5Change = useCallback(
		(step5: number) => {
			node.step5.linearRampToValueAtTime(step5, audioContext.currentTime);
			setState({
				...state,
				step5,
			});
		},
		[state],
	);

	const commitStep6Change = useCallback(
		(step6: number) => {
			node.step6.linearRampToValueAtTime(step6, audioContext.currentTime);
			setState({
				...state,
				step6,
			});
		},
		[state],
	);

	const commitStep7Change = useCallback(
		(step7: number) => {
			node.step7.linearRampToValueAtTime(step7, audioContext.currentTime);
			setState({
				...state,
				step7,
			});
		},
		[state],
	);

	const commitStep8Change = useCallback(
		(step8: number) => {
			node.step8.linearRampToValueAtTime(step8, audioContext.currentTime);
			setState({
				...state,
				step8,
			});
		},
		[state],
	);

	const commitStep9Change = useCallback(
		(step9: number) => {
			node.step9.linearRampToValueAtTime(step9, audioContext.currentTime);
			setState({
				...state,
				step9,
			});
		},
		[state],
	);

	const commitStep10Change = useCallback(
		(step10: number) => {
			node.step10.linearRampToValueAtTime(step10, audioContext.currentTime);
			setState({
				...state,
				step10,
			});
		},
		[state],
	);

	const commitStep11Change = useCallback(
		(step11: number) => {
			node.step11.linearRampToValueAtTime(step11, audioContext.currentTime);
			setState({
				...state,
				step11,
			});
		},
		[state],
	);

	const commitStep12Change = useCallback(
		(step12: number) => {
			node.step12.linearRampToValueAtTime(step12, audioContext.currentTime);
			setState({
				...state,
				step12,
			});
		},
		[state],
	);

	const commitStep13Change = useCallback(
		(step13: number) => {
			node.step13.linearRampToValueAtTime(step13, audioContext.currentTime);
			setState({
				...state,
				step13,
			});
		},
		[state],
	);

	const commitStep14Change = useCallback(
		(step14: number) => {
			node.step14.linearRampToValueAtTime(step14, audioContext.currentTime);
			setState({
				...state,
				step14,
			});
		},
		[state],
	);

	const commitStep15Change = useCallback(
		(step15: number) => {
			node.step15.linearRampToValueAtTime(step15, audioContext.currentTime);
			setState({
				...state,
				step15,
			});
		},
		[state],
	);

	const enabled = state != undefined;

	const clock = useCallback(() => node.node(), [enabled]);

	const output = useCallback(() => node.node(), [enabled]);

	const stepsAccessor = useCallback(() => node.steps as IAudioParam, [enabled]);

	const step0Accessor = useCallback(() => node.step0 as IAudioParam, [enabled]);

	const step1Accessor = useCallback(() => node.step1 as IAudioParam, [enabled]);

	const step2Accessor = useCallback(() => node.step2 as IAudioParam, [enabled]);

	const step3Accessor = useCallback(() => node.step3 as IAudioParam, [enabled]);

	const step4Accessor = useCallback(() => node.step4 as IAudioParam, [enabled]);

	const step5Accessor = useCallback(() => node.step5 as IAudioParam, [enabled]);

	const step6Accessor = useCallback(() => node.step6 as IAudioParam, [enabled]);

	const step7Accessor = useCallback(() => node.step7 as IAudioParam, [enabled]);

	const step8Accessor = useCallback(() => node.step8 as IAudioParam, [enabled]);

	const step9Accessor = useCallback(() => node.step9 as IAudioParam, [enabled]);

	const step10Accessor = useCallback(
		() => node.step10 as IAudioParam,
		[enabled],
	);

	const step11Accessor = useCallback(
		() => node.step11 as IAudioParam,
		[enabled],
	);

	const step12Accessor = useCallback(
		() => node.step12 as IAudioParam,
		[enabled],
	);

	const step13Accessor = useCallback(
		() => node.step13 as IAudioParam,
		[enabled],
	);

	const step14Accessor = useCallback(
		() => node.step14 as IAudioParam,
		[enabled],
	);

	const step15Accessor = useCallback(
		() => node.step15 as IAudioParam,
		[enabled],
	);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ clock }}
				outputAccessors={{ output }}
			/>
			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={stepsAccessor}
					name="steps"
					value={state.steps}
					commitValueCallback={commitStepsChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={step0Accessor}
					name="step 1"
					value={state.step0}
					commitValueCallback={commitStep0Change}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={step1Accessor}
					name="step 2"
					value={state.step1}
					commitValueCallback={commitStep1Change}
				/>
				{state.steps >= 3 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step2Accessor}
						name="step 3"
						value={state.step2}
						commitValueCallback={commitStep2Change}
					/>
				) : null}
				{state.steps >= 4 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step3Accessor}
						name="step 4"
						value={state.step3}
						commitValueCallback={commitStep3Change}
					/>
				) : null}
				{state.steps >= 5 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step4Accessor}
						name="step 5"
						value={state.step4}
						commitValueCallback={commitStep4Change}
					/>
				) : null}
				{state.steps >= 6 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step5Accessor}
						name="step 6"
						value={state.step5}
						commitValueCallback={commitStep5Change}
					/>
				) : null}
				{state.steps >= 7 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step6Accessor}
						name="step 7"
						value={state.step6}
						commitValueCallback={commitStep6Change}
					/>
				) : null}
				{state.steps >= 8 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step7Accessor}
						name="step 8"
						value={state.step7}
						commitValueCallback={commitStep7Change}
					/>
				) : null}
				{state.steps >= 9 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step8Accessor}
						name="step 9"
						value={state.step8}
						commitValueCallback={commitStep8Change}
					/>
				) : null}
				{state.steps >= 10 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step9Accessor}
						name="step 10"
						value={state.step9}
						commitValueCallback={commitStep9Change}
					/>
				) : null}
				{state.steps >= 11 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step10Accessor}
						name="step 11"
						value={state.step10}
						commitValueCallback={commitStep10Change}
					/>
				) : null}
				{state.steps >= 12 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step11Accessor}
						name="step 12"
						value={state.step11}
						commitValueCallback={commitStep11Change}
					/>
				) : null}
				{state.steps >= 13 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step12Accessor}
						name="step 13"
						value={state.step12}
						commitValueCallback={commitStep12Change}
					/>
				) : null}
				{state.steps >= 14 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step13Accessor}
						name="step 14"
						value={state.step13}
						commitValueCallback={commitStep13Change}
					/>
				) : null}
				{state.steps >= 15 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step14Accessor}
						name="step 15"
						value={state.step14}
						commitValueCallback={commitStep14Change}
					/>
				) : null}
				{state.steps >= 16 ? (
					<NumberParameter
						moduleKey={module.moduleKey}
						paramAccessor={step15Accessor}
						name="step 16"
						value={state.step15}
						commitValueCallback={commitStep15Change}
					/>
				) : null}
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
