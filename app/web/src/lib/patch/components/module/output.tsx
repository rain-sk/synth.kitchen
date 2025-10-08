import React, { useCallback, useEffect, useRef } from 'react';
import {
	Module,
	ModuleState,
	ModuleType,
	OUTPUT_STATE_VERSIONS,
} from 'synth.kitchen-shared';

import { audioContext } from '../../audio';
import { OutputNode } from '../../audio/nodes/output';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const outputStateFromNode = (node: OutputNode): ModuleState['OUTPUT'] => ({
	version: OUTPUT_STATE_VERSIONS[0],
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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.gain !== node.gain.value) {
			commitGainChange(module.state.gain);
		}
	}, [module.state, commitGainChange]);

	const gainAccessor = useCallback(() => {
		return node.gain;
	}, [enabled]);

	const speaker = node.speaker;
	const resampling = node.resampling;

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ speaker }}
				outputAccessors={{ resampling }}
			/>
			<NumberParameter
				moduleId={module.id}
				paramAccessor={gainAccessor}
				name="gain"
				value={state.gain}
				commitValueCallback={commitGainChange}
			/>
		</>
	) : null;
};
