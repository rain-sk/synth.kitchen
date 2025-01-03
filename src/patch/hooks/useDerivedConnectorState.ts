import { useEffect } from 'react';
import { createGlobalState } from 'react-use';

import {
	connectionInfo,
	connectorInfo,
	connectorKey,
} from '../state/connection';
import { IoType } from '../state/types/connection';

type DerivedConnectorState = {
	activeConnectorIsInput: boolean;
	activeConnectorIsOutput: boolean;
	connectedToActiveConnector: Set<string>;
};

export const useDerivedConnectorState =
	createGlobalState<DerivedConnectorState>({
		activeConnectorIsInput: false,
		activeConnectorIsOutput: false,
		connectedToActiveConnector: new Set<string>(),
	});

export const useEffectToMaintainDerivedConnectorState = (
	activeConnectorKey?: string,
) => {
	const [, setDerivedConnectorState] = useDerivedConnectorState();

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
			setDerivedConnectorState({
				activeConnectorIsInput: !activeConnectorIsOutput,
				activeConnectorIsOutput,
				connectedToActiveConnector: new Set(connectedConnectors),
			});
		} else {
			setDerivedConnectorState({
				activeConnectorIsInput: false,
				activeConnectorIsOutput: false,
				connectedToActiveConnector: new Set<string>(),
			});
		}
	}, [activeConnectorKey]);
};
