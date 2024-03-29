import React, { useCallback, useRef } from 'react';

import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>
): IModuleState['DELAY'] => ({
	delayTime: node.delayTime.value
});

const initDelay = (
	delayRef: React.MutableRefObject<IDelayNode<IAudioContext> | undefined>,
	state?: IModuleState['DELAY']
) => {
	delayRef.current = audioContext.createDelay();
	if (state) {
		delayRef.current.delayTime.setValueAtTime(
			state.delayTime,
			audioContext.currentTime
		);
		return state;
	} else {
		return delayStateFromNode(delayRef.current);
	}
};

export const DelayModule: React.FC<{ module: IModule<'DELAY'> }> = ({
	module
}) => {
	const delayRef = useRef<IDelayNode<IAudioContext>>();
	const [state, setState] = useModuleState<'DELAY'>(
		() => initDelay(delayRef, module.state),
		module.moduleKey
	);

	const enabled = !!state;

	const input = useCallback(() => delayRef.current as any, [enabled]);

	const output = useCallback(() => delayRef.current as any, [enabled]);

	const commitTimeChange = useCallback(
		(delayTime: number) => {
			delayRef.current?.delayTime.linearRampToValueAtTime(
				delayTime,
				audioContext.currentTime
			);
			setState({
				...state,
				delayTime
			});
		},
		[audioContext, state]
	);

	const delayTimeAccessor = useCallback(
		() => delayRef.current?.delayTime as any,
		[enabled]
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
					paramAccessor={delayTimeAccessor}
					name="time"
					value={state.delayTime}
					commitValueCallback={commitTimeChange}
				/>
			</section>
		</>
	) : null;
};
