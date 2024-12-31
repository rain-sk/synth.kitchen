import React, { useCallback } from 'react';

import { GateNode } from '../../audio/nodes/gate';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { audioContext } from '../../audio/context';
import { useNodeRef } from '../../hooks/use-node-ref';

const gateStateFromNode = (gate: GateNode): IModuleState['GATE'] => ({
	gate: gate.gate.value,
});

const initGate = (
	gateRef: React.MutableRefObject<GateNode | undefined>,
	state?: IModuleState['GATE'],
) => {
	if (!gateRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		gateRef.current.gate.setValueAtTime(state.gate, audioContext.currentTime);
		return state;
	} else {
		return gateStateFromNode(gateRef.current);
	}
};

export const GateModule: React.FC<{ module: IModule<'GATE'> }> = ({
	module,
}) => {
	const gateRef = useNodeRef(() => new GateNode());
	const [state, setState] = useModuleState<'GATE', GateNode>(
		gateRef,
		module,
		() => initGate(gateRef, module.state),
	);

	const enabled = state !== undefined;

	const commitGateChange = useCallback(
		(gate: number) => {
			gateRef.current?.gate.linearRampToValueAtTime(
				gate,
				audioContext.currentTime,
			);
			setState({
				...state,
				gate,
			});
		},
		[state],
	);

	const gateAccessor = useCallback(
		() => gateRef.current?.gate as any,
		[enabled],
	);

	const sync = useCallback(() => gateRef.current?.node() as any, [enabled]);

	const output = useCallback(() => gateRef.current?.node() as any, [enabled]);

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
