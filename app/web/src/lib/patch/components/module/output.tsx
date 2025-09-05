import React, { useCallback } from 'react';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { audioContext } from '../../audio';
import { OutputNode } from '../../audio/nodes/output';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const outputStateFromNode = (node: OutputNode): ModuleState['OUTPUT'] => ({
	version: '0.5.0',
	gain: node.gain.value,
});

const initOutput = (output: OutputNode, state?: ModuleState['OUTPUT']) => {
	if (state) {
		output.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(output);
	}
};

export const OutputModule: React.FC<{ module: Module<ModuleType.OUTPUT> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<OutputNode, ModuleType.OUTPUT>(
		module,
		initOutput,
		() => new OutputNode(),
	);

	const enabled = state != undefined;

	const commitGainChange = useCallback(
		(gain: number) => {
			node.gain.linearRampToValueAtTime(gain, audioContext.currentTime);
			setState({
				...state,
				gain,
			});
		},
		[setState, state],
	);

	const gainAccessor = useCallback(() => {
		return node.gain;
	}, [enabled]);

	const speaker = node.speaker;
	const resampling = node.resampling;

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ speaker }}
				outputAccessors={{ resampling }}
			/>
			<NumberParameter
				moduleKey={module.moduleKey}
				paramAccessor={gainAccessor}
				name="gain"
				value={state.gain}
				commitValueCallback={commitGainChange}
			/>
		</>
	) : null;
};
