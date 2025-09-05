import React, { useCallback } from 'react';

import { audioContext } from '../../audio';
import { ClockNode } from '../../audio/nodes/clock';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const clockStateFromNode = (clock: ClockNode): ModuleState['CLOCK'] => ({
	version: '0.5.0',
	tempo: clock.tempo.value,
});

const initClock = (
	clock: ClockNode,
	state?: ModuleState['CLOCK'],
): ModuleState['CLOCK'] => {
	if (state) {
		clock.tempo.setValueAtTime(state.tempo, audioContext.currentTime);
		return state;
	} else {
		return clockStateFromNode(clock);
	}
};

export const ClockModule: React.FC<{ module: Module<ModuleType.CLOCK> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<ClockNode, ModuleType.CLOCK>(
		module,
		initClock,
		() => new ClockNode(),
	);

	const commitTempoChange = useCallback(
		(tempo: number) => {
			node.tempo.linearRampToValueAtTime(tempo, audioContext.currentTime);
			setState({
				...state,
				tempo,
			});
		},
		[state],
	);

	const enabled = state !== undefined;

	const tempoAccessor = useCallback(() => node.tempo, [enabled]);

	const sync = useCallback(() => node.node(), [enabled]);

	const output = useCallback(() => node.node(), [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ sync }}
				outputAccessors={{ output }}
			/>
			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={tempoAccessor}
					name="tempo"
					value={state.tempo}
					commitValueCallback={commitTempoChange}
				/>
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
