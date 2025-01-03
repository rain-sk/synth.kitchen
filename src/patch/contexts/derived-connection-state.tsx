import React, { useCallback, useMemo } from 'react';

import {
	connectorKey,
	connectorInfo,
	connectionInfo,
} from '../state/connection';
import {
	IConnectorInfo,
	IInput,
	IoType,
	IOutput,
} from '../state/types/connection';

type DerivedConnectionState = {
	connectionCount: number;
	connectorCount: number;
	activeConnectorIsInput: boolean;
	activeConnectorIsOutput: boolean;
	connectedToActiveConnector: Set<string>;
	connectorButton: (key: string) => HTMLButtonElement;
};

export const DerivedConnectionStateContext =
	React.createContext<DerivedConnectionState>({
		connectionCount: 0,
		connectorCount: 0,
		activeConnectorIsInput: false,
		activeConnectorIsOutput: false,
		connectedToActiveConnector: new Set<string>(),
		connectorButton: () => undefined as any as HTMLButtonElement,
	});

export const DerivedConnectionStateContextProvider: React.FunctionComponent<{
	activeConnectorKey?: string;
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
	children: React.ReactNode;
}> = ({ children, activeConnectorKey, connections, connectors }) => {
	const connectionCount = useMemo(
		() => Object.keys(connections).length,
		[connections],
	);
	const connectorCount = useMemo(
		() => Object.keys(connectors).length,
		[connectors],
	);

	const connectorButtons = useMemo(
		() =>
			Object.fromEntries(
				Object.keys(connectors).map((key) => {
					const button = document.getElementById(key) as HTMLButtonElement;
					if (!button) {
						throw Error(`Button for connector with key '${key}' not found`);
					}
					return [key, button];
				}),
			),
		[connectors],
	);

	const connectorButton = useCallback(
		(key: string) => {
			const button = connectorButtons[key];

			if (!button) {
				throw Error(`Button for connector with key '${key}' not found`);
			}

			return button;
		},
		[connectorButtons],
	);

	const {
		activeConnectorIsInput,
		activeConnectorIsOutput,
		connectedToActiveConnector,
	} = useMemo(() => {
		if (activeConnectorKey) {
			const [activeConnector, activeConnectorConnections] = connectorInfo(
				connectors,
				activeConnectorKey,
			);

			const activeConnectorIsOutput =
				'type' in activeConnector && activeConnector.type === IoType.output;
			const connectedConnectors = [...activeConnectorConnections]
				.filter((key) => key in connections)
				.map((key) => connectionInfo(connections, key))
				.map(([output, input]) =>
					activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
				);

			return {
				activeConnectorIsInput: !activeConnectorIsOutput,
				activeConnectorIsOutput,
				connectedToActiveConnector: new Set([...connectedConnectors]),
			};
		} else {
			return {
				activeConnectorIsInput: false,
				activeConnectorIsOutput: false,
				connectedToActiveConnector: new Set<string>(),
			};
		}
	}, [activeConnectorKey]);

	return (
		<DerivedConnectionStateContext.Provider
			value={{
				connectionCount,
				connectorCount,
				activeConnectorIsInput,
				activeConnectorIsOutput,
				connectedToActiveConnector,
				connectorButton,
			}}
		>
			{children}
		</DerivedConnectionStateContext.Provider>
	);
};
