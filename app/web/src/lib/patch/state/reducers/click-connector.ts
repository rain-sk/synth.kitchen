import { Input } from 'synth.kitchen-shared';
import { IoType } from 'synth.kitchen-shared';
import { Output } from 'synth.kitchen-shared';
import { IClickConnector } from '../actions/click-connector';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';
import { connectionKey, connectorInfo, connectorKey } from '../connection';
import { connect, disconnect } from './connection';

export const clickConnector: React.Reducer<IPatchState, IClickConnector> = (
	state,
	action,
) => {
	const [clicked] = state.connectors[connectorKey(action.payload)];

	if (!state.activeConnectorKey) {
		return cloneAndApply(state, { activeConnectorKey: connectorKey(clicked) });
	}

	const active = connectorInfo(state.connectors, state.activeConnectorKey);
	const activeConnector = active[0];
	const activeConnectorIsOutput =
		'type' in activeConnector && activeConnector.type === IoType.output;
	const clickedConnectorIsOutput =
		'type' in clicked && clicked.type === IoType.output;
	if (activeConnectorIsOutput !== clickedConnectorIsOutput) {
		const output = (
			activeConnectorIsOutput ? activeConnector : clicked
		) as Output;
		const input = (
			activeConnectorIsOutput ? clicked : activeConnector
		) as Input;

		const key = connectionKey(output, input);

		return cloneAndApply(
			key in state.connections
				? disconnect(state, {
						type: 'Disconnect',
						payload: { connectionKey: key },
				  })
				: connect(state, { type: 'Connect', payload: [output, input] }),
			{ activeConnectorKey: undefined },
		);
	}

	return cloneAndApply(state, {
		activeConnectorKey: undefined,
	});
};
