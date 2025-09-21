import React, { useCallback } from 'react';
import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>,
): ModuleState['DELAY'] => ({
	version: '0.5.0',
	delayTime: node.delayTime.value,
});

const initDelay = (
	delay: IDelayNode<IAudioContext>,
	state?: ModuleState['DELAY'],
) => {
	if (state) {
		delay.delayTime.setValueAtTime(state.delayTime, audioContext.currentTime);
		return state;
	} else {
		return delayStateFromNode(delay);
	}
};

export const DelayModule: React.FC<{ module: Module<ModuleType.DELAY> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<
		IDelayNode<IAudioContext>,
		ModuleType.DELAY
	>(module, initDelay, () => audioContext.createDelay(179.99999999999));

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
				moduleId={module.id}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={delayTimeAccessor}
					name="time"
					value={state.delayTime}
					commitValueCallback={commitTimeChange}
				/>
			</section>
		</>
	) : null;
};
