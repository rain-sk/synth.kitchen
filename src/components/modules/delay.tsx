import React, { useCallback } from 'react';

import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { useNode } from '../../hooks/use-node';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>,
): IModuleState['DELAY'] => ({
	delayTime: node.delayTime.value,
});

const initDelay = (
	delay: IDelayNode<IAudioContext>,
	state?: IModuleState['DELAY'],
) => {
	if (state) {
		delay.delayTime.setValueAtTime(state.delayTime, audioContext.currentTime);
		return state;
	} else {
		return delayStateFromNode(delay);
	}
};

export const DelayModule: React.FC<{ module: IModule<'DELAY'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<IDelayNode<IAudioContext>, 'DELAY'>(
		module,
		initDelay,
		() => audioContext.createDelay(179.99999999999),
	);

	const enabled = state !== undefined;

	const input = useCallback(() => node, [enabled]);

	const output = useCallback(() => node, [enabled]);

	const commitTimeChange = useCallback(
		(delayTime: number) => {
			node.delayTime.linearRampToValueAtTime(
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

	const delayTimeAccessor = useCallback(() => node.delayTime, [enabled]);

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
