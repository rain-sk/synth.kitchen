import React from 'react';

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
	const [activeConnector, activeConnectorConnections] = activeConnectorKey
		? connectorInfo(connectors, activeConnectorKey)
		: [undefined, []];

	const activeConnectorIsOutput = activeConnector
		? activeConnector &&
		  'type' in activeConnector &&
		  activeConnector.type === IoType.output
		: false;
	const activeConnectorIsInput = activeConnector
		? !activeConnectorIsOutput
		: false;

	const connectedToActiveConnector: Set<string> = new Set(
		activeConnectorKey
			? activeConnectorConnections
					.map((key) => connectionInfo(connections, key))
					.map(([output, input]) =>
						activeConnectorIsOutput
							? connectorKey(input)
							: connectorKey(output),
					)
			: undefined,
	);

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
