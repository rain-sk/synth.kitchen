import { useEffect } from 'react';
import { IPatchAction, patchActions } from '../../state/actions';
import { connectorButtonExists, connectorKey } from '../../state/connection';
import { IConnectorInfo, IInput, IOutput } from '../../state/types/connection';

const doLoadConnections = (
	connectedConnectors: Set<string>,
	dispatch: React.Dispatch<IPatchAction>,
) => {
	const connectorButtonsExist = [...connectedConnectors].every((key) =>
		connectorButtonExists(key),
	);
	if (connectorButtonsExist) {
		dispatch(patchActions.loadConnectionsAction());
	} else {
		console.log('delay load connections');
		setTimeout(() => doLoadConnections(connectedConnectors, dispatch), 17);
	}
};

export const useLoadConnections = ({
	initialized,
	loadConnections,
	connections,
	connectors,
	dispatch,
}: {
	initialized: boolean;
	loadConnections: boolean;
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
	dispatch: React.Dispatch<IPatchAction>;
}) => {
	useEffect(() => {
		if (initialized && loadConnections) {
			const connectedConnectors = new Set<string>();
			Object.values(connections).forEach(([output, input]) => {
				connectedConnectors.add(connectorKey(output));
				connectedConnectors.add(connectorKey(input));
			});
			if (
				connectedConnectors.size > 0 &&
				[...connectedConnectors].every((key) => key in connectors)
			) {
				doLoadConnections(connectedConnectors, dispatch);
			}
		}
	}, [initialized, loadConnections, connections, connectors]);
};
