import React, { useMemo } from 'react';
import { ConnectionsState, IoType } from 'synth.kitchen-shared';

import { connectorKey } from '../state/connection';import { ConnectorInfo } from '../state/types/patch';

type DerivedConnectionState = {
	activeConnectorIsInput: boolean;
	activeConnectorIsOutput: boolean;
	connectedToActiveConnector: Set<string>;
	pluggedConnectorKeys: Set<string>;
};
export const DerivedConnectionStateContext =
	React.createContext<DerivedConnectionState>({
		activeConnectorIsInput: false,
		activeConnectorIsOutput: false,
		connectedToActiveConnector: new Set<string>(),
		pluggedConnectorKeys: new Set<string>(),
	});

export const DerivedConnectionStateContextProvider: React.FC<
	React.PropsWithChildren<{
		activeConnectorKey?: string;
		connections: ConnectionsState;
		connectors: Record<string, ConnectorInfo>;
	}>
> = ({ children, activeConnectorKey, connections, connectors }) => {
	const [activeConnector, activeConnectorConnections] = useMemo(
		(): ConnectorInfo | [undefined, string[]] =>
			(activeConnectorKey && connectors[activeConnectorKey]) || [undefined, []],
		[activeConnectorKey, connectors],
	);

	const { activeConnectorIsInput, activeConnectorIsOutput } = useMemo(() => {
		if (activeConnector) {
			const activeConnectorIsOutput =
				activeConnector &&
				'type' in activeConnector &&
				activeConnector.type === IoType.output;

			return {
				activeConnectorIsInput: !activeConnectorIsOutput,
				activeConnectorIsOutput,
			};
		} else {
			return {
				activeConnectorIsInput: false,
				activeConnectorIsOutput: false,
			};
		}
	}, [activeConnector]);

	const pluggedConnectorKeys = useMemo(() => {
		const plugged = new Set<string>();
		for (const [output, input] of Object.values(connections.state)) {
			plugged.add(connectorKey(output));
			plugged.add(connectorKey(input));
		}
		return plugged;
	}, [connections]);

	const connectedToActiveConnector = useMemo(() => {
		if (!activeConnectorKey) {
			return new Set<string>();
		}
		const connected = new Set<string>();
		for (const key of activeConnectorConnections) {
			const connection = connections.state[key];
			if (!connection) {
				continue;
			}
			const [output, input] = connection;
			connected.add(
				activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
			);
		}
		return connected;
	}, [
		activeConnectorKey,
		activeConnectorConnections,
		activeConnectorIsOutput,
		connections,
	]);

	return (
		<DerivedConnectionStateContext.Provider
			value={{
				activeConnectorIsInput,
				activeConnectorIsOutput,
				connectedToActiveConnector,
				pluggedConnectorKeys,
			}}
		>
			{children}
		</DerivedConnectionStateContext.Provider>
	);
};
