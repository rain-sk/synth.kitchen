import React, { useCallback, useEffect, useRef } from 'react';

import { audioContext } from '../../audio';
import { SequencerNode } from '../../audio/nodes/sequencer';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import {
	Module,
	ModuleState,
	ModuleType,
	SEQUENCER_STATE_VERSIONS,
} from 'synth.kitchen-shared';

const sequencerStateFromNode = (
	sequencer: SequencerNode,
): ModuleState['SEQUENCER'] => ({
	version: SEQUENCER_STATE_VERSIONS[0],
	steps: sequencer.steps.value,
	slide: sequencer.slide.value,
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
	state?: ModuleState['SEQUENCER'],
) => {
	if (state) {
		sequencer.steps.setValueAtTime(state.steps, audioContext.currentTime);
		sequencer.slide.setValueAtTime(state.slide ?? 0, audioContext.currentTime);
		sequencer.step0.setValueAtTime(state.step0, audioContext.currentTime);
		sequencer.step1.setValueAtTime(state.step1, audioContext.currentTime);
		sequencer.step2.setValueAtTime(state.step2, audioContext.currentTime);
		sequencer.step3.setValueAtTime(state.step3, audioContext.currentTime);
		sequencer.step4.setValueAtTime(state.step4, audioContext.currentTime);
		sequencer.step5.setValueAtTime(state.step5, audioContext.currentTime);
		sequencer.step6.setValueAtTime(state.step6, audioContext.currentTime);
		sequencer.step7.setValueAtTime(state.step7, audioContext.currentTime);
		sequencer.step8.setValueAtTime(state.step8, audioContext.currentTime);
		sequencer.step9.setValueAtTime(state.step9, audioContext.currentTime);
		sequencer.step10.setValueAtTime(state.step10, audioContext.currentTime);
		sequencer.step11.setValueAtTime(state.step11, audioContext.currentTime);
		sequencer.step12.setValueAtTime(state.step12, audioContext.currentTime);
		sequencer.step13.setValueAtTime(state.step13, audioContext.currentTime);
		sequencer.step14.setValueAtTime(state.step14, audioContext.currentTime);
		sequencer.step15.setValueAtTime(state.step15, audioContext.currentTime);
		return state;
	} else {
		return sequencerStateFromNode(sequencer);
	}
};

export const SequencerModule: React.FC<{
	module: Module<ModuleType.SEQUENCER>;
}> = ({ module }) => {
	const { node, state, setState } = useNode<
		SequencerNode,
		ModuleType.SEQUENCER
	>(module, initSequencer, () => new SequencerNode());

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

	const commitSlideChange = useCallback(
		(slide: number) => {
			slide = Math.max(0, slide);
			node.slide.linearRampToValueAtTime(slide, audioContext.currentTime);
			setState({
				...state,
				slide,
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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.steps !== node.steps.value) {
			commitStepsChange(module.state.steps);
		}
		if (module.state.slide !== node.slide.value) {
			commitSlideChange(module.state.slide);
		}
		if (module.state.step0 !== node.step0.value) {
			commitStep0Change(module.state.step0);
		}
		if (module.state.step1 !== node.step1.value) {
			commitStep1Change(module.state.step1);
		}
		if (module.state.step2 !== node.step2.value) {
			commitStep2Change(module.state.step2);
		}
		if (module.state.step3 !== node.step3.value) {
			commitStep3Change(module.state.step3);
		}
		if (module.state.step4 !== node.step4.value) {
			commitStep4Change(module.state.step4);
		}
		if (module.state.step5 !== node.step5.value) {
			commitStep5Change(module.state.step5);
		}
		if (module.state.step6 !== node.step6.value) {
			commitStep6Change(module.state.step6);
		}
		if (module.state.step7 !== node.step7.value) {
			commitStep7Change(module.state.step7);
		}
		if (module.state.step8 !== node.step8.value) {
			commitStep8Change(module.state.step8);
		}
		if (module.state.step9 !== node.step9.value) {
			commitStep9Change(module.state.step9);
		}
		if (module.state.step10 !== node.step10.value) {
			commitStep10Change(module.state.step10);
		}
		if (module.state.step11 !== node.step11.value) {
			commitStep11Change(module.state.step11);
		}
		if (module.state.step12 !== node.step12.value) {
			commitStep12Change(module.state.step12);
		}
		if (module.state.step13 !== node.step13.value) {
			commitStep13Change(module.state.step13);
		}
		if (module.state.step14 !== node.step14.value) {
			commitStep14Change(module.state.step14);
		}
		if (module.state.step15 !== node.step15.value) {
			commitStep15Change(module.state.step15);
		}
	}, [
		module.state,
		commitStepsChange,
		commitSlideChange,
		commitStep0Change,
		commitStep1Change,
		commitStep2Change,
		commitStep3Change,
		commitStep4Change,
		commitStep5Change,
		commitStep6Change,
		commitStep7Change,
		commitStep8Change,
		commitStep9Change,
		commitStep10Change,
		commitStep11Change,
		commitStep12Change,
		commitStep13Change,
		commitStep14Change,
		commitStep15Change,
	]);

	const enabled = state != undefined;

	const trigger = useCallback(() => node.node(), [enabled]);

	const control = useCallback(() => node.node(), [enabled]);

	const stepsAccessor = useCallback(() => node.steps, [enabled]);

	const slideAccessor = useCallback(() => node.slide, [enabled]);

	const step0Accessor = useCallback(() => node.step0, [enabled]);

	const step1Accessor = useCallback(() => node.step1, [enabled]);

	const step2Accessor = useCallback(() => node.step2, [enabled]);

	const step3Accessor = useCallback(() => node.step3, [enabled]);

	const step4Accessor = useCallback(() => node.step4, [enabled]);

	const step5Accessor = useCallback(() => node.step5, [enabled]);

	const step6Accessor = useCallback(() => node.step6, [enabled]);

	const step7Accessor = useCallback(() => node.step7, [enabled]);

	const step8Accessor = useCallback(() => node.step8, [enabled]);

	const step9Accessor = useCallback(() => node.step9, [enabled]);

	const step10Accessor = useCallback(() => node.step10, [enabled]);

	const step11Accessor = useCallback(() => node.step11, [enabled]);

	const step12Accessor = useCallback(() => node.step12, [enabled]);

	const step13Accessor = useCallback(() => node.step13, [enabled]);

	const step14Accessor = useCallback(() => node.step14, [enabled]);

	const step15Accessor = useCallback(() => node.step15, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ trigger }}
				outputAccessors={{ control }}
			/>
			<section>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={stepsAccessor}
					name="steps"
					value={state.steps}
					commitValueCallback={commitStepsChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={slideAccessor}
					name="slide"
					value={state.slide}
					commitValueCallback={commitSlideChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={step0Accessor}
					name="step_1"
					value={state.step0}
					commitValueCallback={commitStep0Change}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={step1Accessor}
					name="step_2"
					value={state.step1}
					commitValueCallback={commitStep1Change}
				/>
				{state.steps >= 3 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step2Accessor}
						name="step_3"
						value={state.step2}
						commitValueCallback={commitStep2Change}
					/>
				) : null}
				{state.steps >= 4 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step3Accessor}
						name="step_4"
						value={state.step3}
						commitValueCallback={commitStep3Change}
					/>
				) : null}
				{state.steps >= 5 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step4Accessor}
						name="step_5"
						value={state.step4}
						commitValueCallback={commitStep4Change}
					/>
				) : null}
				{state.steps >= 6 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step5Accessor}
						name="step_6"
						value={state.step5}
						commitValueCallback={commitStep5Change}
					/>
				) : null}
				{state.steps >= 7 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step6Accessor}
						name="step_7"
						value={state.step6}
						commitValueCallback={commitStep6Change}
					/>
				) : null}
				{state.steps >= 8 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step7Accessor}
						name="step_8"
						value={state.step7}
						commitValueCallback={commitStep7Change}
					/>
				) : null}
				{state.steps >= 9 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step8Accessor}
						name="step_9"
						value={state.step8}
						commitValueCallback={commitStep8Change}
					/>
				) : null}
				{state.steps >= 10 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step9Accessor}
						name="step_10"
						value={state.step9}
						commitValueCallback={commitStep9Change}
					/>
				) : null}
				{state.steps >= 11 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step10Accessor}
						name="step_11"
						value={state.step10}
						commitValueCallback={commitStep10Change}
					/>
				) : null}
				{state.steps >= 12 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step11Accessor}
						name="step_12"
						value={state.step11}
						commitValueCallback={commitStep11Change}
					/>
				) : null}
				{state.steps >= 13 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step12Accessor}
						name="step_13"
						value={state.step12}
						commitValueCallback={commitStep12Change}
					/>
				) : null}
				{state.steps >= 14 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step13Accessor}
						name="step_14"
						value={state.step13}
						commitValueCallback={commitStep13Change}
					/>
				) : null}
				{state.steps >= 15 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step14Accessor}
						name="step_15"
						value={state.step14}
						commitValueCallback={commitStep14Change}
					/>
				) : null}
				{state.steps >= 16 ? (
					<NumberParameter
						moduleId={module.id}
						paramAccessor={step15Accessor}
						name="step_16"
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
