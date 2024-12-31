import React, { useCallback } from 'react';

import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { useNodeRef } from '../../hooks/use-node-ref';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>,
): IModuleState['DELAY'] => ({
	delayTime: node.delayTime.value,
});

const initDelay = (
	delayRef: React.MutableRefObject<IDelayNode<IAudioContext> | undefined>,
	state?: IModuleState['DELAY'],
) => {
	if (!delayRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		delayRef.current.delayTime.setValueAtTime(
			state.delayTime,
			audioContext.currentTime,
		);
		return state;
	} else {
		return delayStateFromNode(delayRef.current);
	}
};

export const DelayModule: React.FC<{ module: IModule<'DELAY'> }> = ({
	module,
}) => {
	const delayRef = useNodeRef(() => audioContext.createDelay());
	const [state, setState] = useModuleState<'DELAY', IDelayNode<IAudioContext>>(
		delayRef,
		module,
		() => initDelay(delayRef, module.state),
	);

	const enabled = state !== undefined;

	const input = useCallback(() => delayRef.current, [enabled]);

	const output = useCallback(() => delayRef.current, [enabled]);

	const commitTimeChange = useCallback(
		(delayTime: number) => {
			delayRef.current.delayTime.linearRampToValueAtTime(
				delayTime,
				audioContext.currentTime,
			);
			setState({
				...state,
				delayTime,
			});
		},
		[state],
	);

	const delayTimeAccessor = useCallback(
		() => delayRef.current.delayTime,
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
					paramAccessor={delayTimeAccessor}
					name="time"
					value={state.delayTime}
					commitValueCallback={commitTimeChange}
				/>
			</section>
		</>
	) : null;
};
