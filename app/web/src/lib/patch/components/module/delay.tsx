import React, { useCallback, useEffect, useRef } from 'react';
import { IAudioContext, IDelayNode } from 'standardized-audio-context';
import {
	DELAY_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const delayStateFromNode = (
	node: IDelayNode<IAudioContext>,
): ModuleState['DELAY'] => ({
	version: DELAY_STATE_VERSIONS[0],
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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.delayTime !== node.delayTime.value) {
			commitTimeChange(module.state.delayTime);
		}
	}, [module.state, commitTimeChange]);

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
