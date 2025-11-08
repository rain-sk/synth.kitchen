import React, { useCallback, useEffect, useRef } from 'react';

import { audioContext } from '../../audio';
import { ClockNode } from '../../audio/nodes/clock';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import {
	CLOCK_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';

const clockStateFromNode = (clock: ClockNode): ModuleState['CLOCK'] => ({
	version: CLOCK_STATE_VERSIONS[0],
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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.tempo !== node.tempo.value) {
			commitTempoChange(module.state.tempo);
		}
	}, [module.state, commitTempoChange]);

	const sync = useCallback(() => node.node(), [enabled]);

	const trigger = useCallback(() => node.node(), [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ sync }}
				outputAccessors={{ trigger }}
			/>
			<section>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={tempoAccessor}
					name="tempo"
					unit="bpm"
					value={state.tempo}
					commitValueCallback={commitTempoChange}
				/>
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
