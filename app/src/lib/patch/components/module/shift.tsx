import React, { useCallback } from 'react';

import { ShiftNode } from '../../audio/nodes/shift';

import { audioContext } from '../../audio';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const shiftStateFromNode = (shift: ShiftNode): IModuleState['SHIFT'] => ({
	inputMin: shift.inputMin.value,
	inputMax: shift.inputMax.value,
	outputMin: shift.outputMin.value,
	outputMax: shift.outputMax.value,
});

const initShift = (shift: ShiftNode, state?: IModuleState['SHIFT']) => {
	if (state) {
		shift.inputMin.setValueAtTime(state.inputMin, audioContext.currentTime);
		shift.inputMax.setValueAtTime(state.inputMax, audioContext.currentTime);
		shift.outputMin.setValueAtTime(state.outputMin, audioContext.currentTime);
		shift.outputMax.setValueAtTime(state.outputMax, audioContext.currentTime);
		return state;
	} else {
		return shiftStateFromNode(shift);
	}
};

export const ShiftModule: React.FC<{ module: IModule<'SHIFT'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<ShiftNode, 'SHIFT'>(
		module,
		initShift,
		() => new ShiftNode(),
	);

	const enabled = state !== undefined;

	const commitInputMinChange = useCallback(
		(inputMin: number) => {
			node.inputMin.linearRampToValueAtTime(inputMin, audioContext.currentTime);
			setState({
				...state,
				inputMin,
			});
		},
		[state],
	);
	const commitInputMaxChange = useCallback(
		(inputMax: number) => {
			node.inputMax.linearRampToValueAtTime(inputMax, audioContext.currentTime);
			setState({
				...state,
				inputMax,
			});
		},
		[state],
	);
	const commitOutputMinChange = useCallback(
		(outputMin: number) => {
			node.outputMin.linearRampToValueAtTime(
				outputMin,
				audioContext.currentTime,
			);
			setState({
				...state,
				outputMin,
			});
		},
		[state],
	);
	const commitOutputMaxChange = useCallback(
		(outputMax: number) => {
			node.outputMax.linearRampToValueAtTime(
				outputMax,
				audioContext.currentTime,
			);
			setState({
				...state,
				outputMax,
			});
		},
		[state],
	);

	const inputMinAccessor = useCallback(() => node.inputMin, [enabled]);
	const inputMaxAccessor = useCallback(() => node.inputMax, [enabled]);
	const outputMinAccessor = useCallback(() => node.outputMin, [enabled]);
	const outputMaxAccessor = useCallback(() => node.outputMax, [enabled]);

	const input = useCallback(() => node.input(), [enabled]);
	const output = useCallback(() => node.output(), [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>
			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={inputMinAccessor}
					name="input-min"
					value={state.inputMin}
					commitValueCallback={commitInputMinChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={inputMaxAccessor}
					name="input-max"
					value={state.inputMax}
					commitValueCallback={commitInputMaxChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={outputMinAccessor}
					name="output-min"
					value={state.outputMin}
					commitValueCallback={commitOutputMinChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={outputMaxAccessor}
					name="output-max"
					value={state.outputMax}
					commitValueCallback={commitOutputMaxChange}
				/>
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
