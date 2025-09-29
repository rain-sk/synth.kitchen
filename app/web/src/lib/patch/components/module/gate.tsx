import React, { useCallback, useEffect, useRef } from 'react';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { GateNode } from '../../audio/nodes/gate';

import { audioContext } from '../../audio';
import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';

const gateStateFromNode = (gate: GateNode): ModuleState['GATE'] => ({
	version: '0.5.0',
	gate: gate.gate.value,
});

const initGate = (gate: GateNode, state?: ModuleState['GATE']) => {
	if (state) {
		gate.gate.setValueAtTime(state.gate, audioContext.currentTime);
		return state;
	} else {
		return gateStateFromNode(gate);
	}
};

export const GateModule: React.FC<{ module: Module<ModuleType.GATE> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<GateNode, ModuleType.GATE>(
		module,
		initGate,
		() => new GateNode(),
	);

	const enabled = state !== undefined;

	const commitGateChange = useCallback(
		(gate: number) => {
			node.gate.linearRampToValueAtTime(gate, audioContext.currentTime);
			setState({
				...state,
				gate,
			});
		},
		[state],
	);

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.gate !== node.gate.value) {
			commitGateChange(module.state.gate);
		}
	}, [module.state, commitGateChange]);

	const gateAccessor = useCallback(() => node.gate, [enabled]);

	const sync = useCallback(() => node.node(), [enabled]);

	const output = useCallback(() => node.node(), [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ sync }}
				outputAccessors={{ output }}
			/>
			<section>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={gateAccessor}
					name="gate"
					value={state.gate}
					commitValueCallback={commitGateChange}
				/>
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
