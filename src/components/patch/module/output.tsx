import React, { useCallback } from 'react';
import { IAudioParam } from 'standardized-audio-context';

import { audioContext } from '../../../audio/context';

import { OutputNode } from '../../../audio/nodes/output';
import { IModule, IModuleState } from '../../../state/types/module';
import { NumberParameter } from '../module-components/number-parameter';
import { IoConnectors } from '../module-components/io-connectors';
import { useNode } from '../../../hooks/use-node';

const outputStateFromNode = (node: OutputNode): IModuleState['OUTPUT'] => ({
	gain: node.gain.value,
});

const initOutput = (output: OutputNode, state?: IModuleState['OUTPUT']) => {
	if (state) {
		output.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(output);
	}
};

export const OutputModule: React.FC<{ module: IModule<'OUTPUT'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<OutputNode, 'OUTPUT'>(
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
		return node.gain as IAudioParam;
	}, [enabled]);

	const speaker = node.speaker as any;
	const resampling = node.resampling as any;

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
