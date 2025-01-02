import React, { useCallback } from 'react';

import { GateNode } from '../../audio/nodes/gate';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../module-components/io-connectors';
import { NumberParameter } from '../module-components/number-parameter';
import { audioContext } from '../../audio/context';
import { useNode } from '../../../hooks/use-node';

const gateStateFromNode = (gate: GateNode): IModuleState['GATE'] => ({
	gate: gate.gate.value,
});

const initGate = (gate: GateNode, state?: IModuleState['GATE']) => {
	if (state) {
		gate.gate.setValueAtTime(state.gate, audioContext.currentTime);
		return state;
	} else {
		return gateStateFromNode(gate);
	}
};

export const GateModule: React.FC<{ module: IModule<'GATE'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<GateNode, 'GATE'>(
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

	const gateAccessor = useCallback(() => node.gate, [enabled]);

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
