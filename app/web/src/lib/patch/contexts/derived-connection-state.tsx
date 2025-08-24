import React, { useMemo } from 'react';

import {
	connectorKey,
	connectorInfo,
	connectionInfo,
} from '../state/connection';
import { IConnection, IConnectorInfo, IoType } from '../state/types/connection';

type DerivedConnectionState = {
	activeConnectorIsInput: boolean;
	activeConnectorIsOutput: boolean;
	connectedToActiveConnector: Set<string>;
};

export const DerivedConnectionStateContext =
	React.createContext<DerivedConnectionState>({
		activeConnectorIsInput: false,
		activeConnectorIsOutput: false,
		connectedToActiveConnector: new Set<string>(),
	});

export const DerivedConnectionStateContextProvider: React.FC<
	React.PropsWithChildren<{
		activeConnectorKey?: string;
		connections: Record<string, IConnection>;
		connectors: Record<string, IConnectorInfo>;
	}>
> = ({ children, activeConnectorKey, connections, connectors }) => {
	const [activeConnector, activeConnectorConnections] = useMemo(
		() =>
			activeConnectorKey
				? connectorInfo(connectors, activeConnectorKey)
				: [undefined, []],
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

	const connectedToActiveConnector = useMemo(() => {
		if (!activeConnectorKey) {
			return new Set<string>();
		}
		const connectedConnectors = activeConnectorConnections
			.map((key) => connectionInfo(connections, key))
			.map(([output, input]) =>
				activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
			);
		return new Set<string>(connectedConnectors);
	}, [activeConnectorConnections, activeConnectorIsOutput]);

	return (
		<DerivedConnectionStateContext.Provider
			value={{
				activeConnectorIsInput,
				activeConnectorIsOutput,
				connectedToActiveConnector,
			}}
		>
			{children}
		</DerivedConnectionStateContext.Provider>
	);
};
