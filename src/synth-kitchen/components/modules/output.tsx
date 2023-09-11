import React, { useCallback, useRef } from 'react';

import { IAudioParam } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { NumberParameter } from '../number-parameter';
import { IoConnectors } from '../io-connectors';
import { OutputNode } from '../../audio/nodes/output';

const outputStateFromNode = (node: OutputNode): IModuleState['OUTPUT'] => ({
	gain: node.gain.value
});

const initOutput = (
	outputRef: React.MutableRefObject<OutputNode | undefined>,
	state?: IModuleState['OUTPUT']
) => {
	outputRef.current = new OutputNode();
	if (state) {
		outputRef.current.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(outputRef.current);
	}
};

export const OutputModule: React.FC<{ module: IModule<'OUTPUT'> }> = ({
	module
}) => {
	const outputRef = useRef<OutputNode>();
	const [state, setState] = useModuleState<'OUTPUT'>(
		() => initOutput(outputRef, module.state),
		module.moduleKey
	);

	const commitGainChange = useCallback(
		(gain: number) => {
			outputRef.current?.gain.linearRampToValueAtTime(
				gain,
				audioContext.currentTime
			);
			setState({
				...state,
				gain
			});
		},
		[outputRef, setState, state]
	);

	const gainAccessor = useCallback(() => {
		return outputRef.current?.gain as IAudioParam;
	}, []);

	const speaker = outputRef.current?.speaker as any;
	const resampling = outputRef.current?.resampling as any;

	const enabled = state != undefined && outputRef.current;

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
