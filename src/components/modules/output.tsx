import React, { useCallback } from 'react';

import { IAudioParam } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { NumberParameter } from '../number-parameter';
import { IoConnectors } from '../io-connectors';
import { OutputNode } from '../../audio/nodes/output';
import { useNodeRef } from '../../hooks/use-node-ref';

const outputStateFromNode = (node: OutputNode): IModuleState['OUTPUT'] => ({
	gain: node.gain.value,
});

const initOutput = (
	outputRef: React.MutableRefObject<OutputNode | undefined>,
	state?: IModuleState['OUTPUT'],
) => {
	if (!outputRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		outputRef.current.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(outputRef.current);
	}
};

export const OutputModule: React.FC<{ module: IModule<'OUTPUT'> }> = ({
	module,
}) => {
	const outputRef = useNodeRef(() => new OutputNode());
	const [state, setState] = useModuleState<'OUTPUT', OutputNode>(
		outputRef,
		module,
		() => initOutput(outputRef, module.state),
	);

	const enabled = state != undefined;

	const commitGainChange = useCallback(
		(gain: number) => {
			outputRef.current.gain.linearRampToValueAtTime(
				gain,
				audioContext.currentTime,
			);
			setState({
				...state,
				gain,
			});
		},
		[outputRef, setState, state],
	);

	const gainAccessor = useCallback(() => {
		return outputRef.current.gain as IAudioParam;
	}, [enabled]);

	const speaker = outputRef.current.speaker as any;
	const resampling = outputRef.current.resampling as any;

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
