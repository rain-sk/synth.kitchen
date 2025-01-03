import { useEffect } from 'react';
import { createGlobalState } from 'react-use';
import {
	connectionInfo,
	connectorInfo,
	connectorKey,
} from '../state/connection';
import { IoType } from '../state/types/connection';

const useConnectedToActiveConnectorGlobalState = createGlobalState(
	new Set<string>(),
);

export const useConnectedToActiveConnectorState = (
	activeConnectorKey?: string,
) => {
	const [, setConnectedToActiveConnector] =
		useConnectedToActiveConnectorGlobalState();

	useEffect(() => {
		const activeConnectorInfo = connectorInfo(activeConnectorKey);
		if (activeConnectorKey && activeConnectorInfo) {
			const activeConnector = activeConnectorInfo[0];

			const activeConnectorIsOutput =
				'type' in activeConnector && activeConnector.type === IoType.output;
			const connectedConnectors = [...activeConnectorInfo[1]]
				.map((key) => connectionInfo(key))
				.map(([output, input]) =>
					activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
				);
			setConnectedToActiveConnector(new Set(connectedConnectors));
		} else {
			setConnectedToActiveConnector(new Set<string>());
		}
	}, [activeConnectorKey]);
};

export const useConnectedToActiveConnector = (key: string): boolean => {
	const [connectedToActiveConnector] =
		useConnectedToActiveConnectorGlobalState();

	return connectedToActiveConnector.has(key);
};
