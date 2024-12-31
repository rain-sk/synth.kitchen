import React, { useCallback } from 'react';

import { IAudioContext, IGainNode } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { useNodeRef } from '../../hooks/use-node-ref';

const gainStateFromNode = (
	node: IGainNode<IAudioContext>,
): IModuleState['GAIN'] => ({
	gain: node.gain.value,
});

const initGain = (
	gainRef: React.MutableRefObject<IGainNode<IAudioContext> | undefined>,
	state?: IModuleState['GAIN'],
) => {
	if (!gainRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		gainRef.current.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return gainStateFromNode(gainRef.current);
	}
};

export const GainModule: React.FC<{ module: IModule<'GAIN'> }> = ({
	module,
}) => {
	const gainRef = useNodeRef(() => audioContext.createGain());
	const [state, setState] = useModuleState<'GAIN', IGainNode<IAudioContext>>(
		gainRef,
		module,
		() => initGain(gainRef, module.state),
	);

	const enabled = state !== undefined;

	const input = useCallback(() => gainRef.current as any, [enabled]);

	const output = useCallback(() => gainRef.current as any, [enabled]);

	const commitGainChange = useCallback(
		(gain: number) => {
			gainRef.current?.gain.linearRampToValueAtTime(
				gain,
				audioContext.currentTime,
			);
			setState({
				...state,
				gain,
			});
		},
		[state],
	);

	const gainAccessor = useCallback(
		() => gainRef.current?.gain as any,
		[enabled],
	);

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
					paramAccessor={gainAccessor}
					name="gain"
					value={state.gain}
					commitValueCallback={commitGainChange}
				/>
			</section>
		</>
	) : null;
};
