import React, { useCallback, useRef } from 'react';

import {
	IAudioContext,
	IAudioParam,
	IGainNode
} from 'standardized-audio-context';
import { audioContext } from '../audio';
import { useModuleState } from '../hooks/use-module-state';

import { IModule, IModuleState } from '../state/types/module';
import { NumberParameter } from '../components/number-parameter';
import { IoConnectors } from '../components/io-connectors';

const outputStateFromNode = (
	node: IGainNode<IAudioContext>
): IModuleState['OUTPUT'] => ({
	gain: node.gain.value
});

const initOutput = (
	gainRef: React.MutableRefObject<IGainNode<IAudioContext> | undefined>,
	state?: IModuleState['OUTPUT']
) => {
	gainRef.current = audioContext.createGain();
	gainRef.current.connect(audioContext.destination);
	if (state) {
		gainRef.current.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(gainRef.current);
	}
};

export const OutputModule: React.FC<{ module: IModule<'OUTPUT'> }> = ({
	module
}) => {
	const gainRef = useRef<IGainNode<IAudioContext>>();
	const [state, setState] = useModuleState<'OUTPUT'>(
		() => initOutput(gainRef, module.state),
		module.moduleKey
	);

	const commitGainChange = useCallback(
		(gain: number) => {
			gainRef.current?.gain.linearRampToValueAtTime(
				gain,
				audioContext.currentTime
			);
			setState({
				...state,
				gain
			});
		},
		[gainRef, setState, state]
	);

	const gainAccessor = useCallback(() => {
		return gainRef.current?.gain as IAudioParam;
	}, []);

	const enabled = state != undefined && gainRef.current;

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={[() => gainRef.current as any]}
				outputAccessors={[]}
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
