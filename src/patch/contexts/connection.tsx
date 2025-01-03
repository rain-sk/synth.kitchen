import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	IConnector,
	IConnectorInfo,
	IInput,
	IOutput,
	IoType,
} from '../state/types/connection';
import { PatchContext } from './patch';
import {
	connectionInfo,
	connectOrDisconnect,
	connectorInfo,
	connectorKey,
	doRegisterConnector,
	doUnregisterConnector,
} from '../state/connection';
import { patchActions } from '../state/actions';

type IConnectionContext = {
	connectedToActiveConnector: string[];
	connectorCount: number;
	connectionCount: number;
	highlightInputs: boolean;
	highlightOutputs: boolean;
	registerConnector: (connector: IConnector) => void;
	unregisterConnector: (connector: IConnector) => void;
	clickConnector: (connector: IConnector) => void;
	deactivateConnector: () => void;
};

export const ConnectionContext = React.createContext<IConnectionContext>({
	connectedToActiveConnector: [],
	connectorCount: 0,
	connectionCount: 0,
	highlightInputs: false,
	highlightOutputs: false,
	registerConnector: () => {},
	unregisterConnector: () => {},
	clickConnector: () => {},
	deactivateConnector: () => {},
});

export const ConnectionContextProvider: React.FunctionComponent<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [connectorCount, setConnectorCount] = useState(0);
	const [connectionCount, setConnectionCount] = useState(0);

	const { activeConnectorKey, connectionsToLoad, dispatch } =
		useContext(PatchContext);
	const connectionsToLoadRef = useRef<Record<string, [IOutput, IInput]>>();
	useEffect(() => {
		if (
			connectionsToLoad &&
			connectionsToLoad != connectionsToLoadRef.current
		) {
			connectionsToLoadRef.current = connectionsToLoad;

			function tryLoadConnections() {
				if (!connectionsToLoadRef.current) {
					return;
				}

				try {
					const toLoad = Object.fromEntries(
						Object.entries(connectionsToLoadRef.current)
							.filter(([, [output, input]]) => {
								return (
									connectorInfo(connectorKey(output)) &&
									connectorInfo(connectorKey(input))
								);
							})
							.map(([key, [output, input]]) => [
								key,
								[
									(connectorInfo(connectorKey(output)) as IConnectorInfo)[0],
									(connectorInfo(connectorKey(input)) as IConnectorInfo)[0],
								],
							]),
					) as {
						[key: string]: [IOutput, IInput];
					};
					connectionsToLoadRef.current = Object.fromEntries(
						Object.entries(connectionsToLoadRef.current).filter(([key]) => {
							return !toLoad[key];
						}),
					);

					Object.values(toLoad).forEach(([output, input]) => {
						setConnectionCount(connectOrDisconnect(output, input));
					});

					if (
						connectionsToLoadRef.current &&
						Object.keys(connectionsToLoadRef.current).length > 0
					) {
						setTimeout(tryLoadConnections, 17);
					}
				} catch (e) {
					console.error(e);
				}
			}

			setTimeout(tryLoadConnections, 17);
		}
	}, [connectionsToLoad]);

	const registerConnector = useCallback(
		(connector: IConnector) => {
			setConnectorCount(doRegisterConnector(connector));
		},
		[setConnectorCount],
	);

	const unregisterConnector = useCallback(
		(connector: IConnector) => {
			const { connectorCount, connectionCount } =
				doUnregisterConnector(connector);
			setConnectorCount(connectorCount);
			setConnectionCount(connectionCount);
		},
		[setConnectorCount],
	);

	const deactivateConnector = useCallback(() => {
		dispatch(patchActions.setActiveConnectorKeyAction(undefined));
	}, []);

	const clickConnector = useCallback(
		(clicked: IConnector) => {
			const active = connectorInfo(activeConnectorKey);

			if (!active) {
				dispatch(
					patchActions.setActiveConnectorKeyAction(connectorKey(clicked)),
				);
				return;
			}
			dispatch(patchActions.setActiveConnectorKeyAction(undefined));

			const activeConnector = active[0];

			const activeConnectorIsOutput =
				'type' in activeConnector && activeConnector.type === IoType.output;
			const clickedConnectorIsOutput =
				'type' in clicked && clicked.type === IoType.output;

			if (activeConnectorIsOutput !== clickedConnectorIsOutput) {
				setConnectionCount(
					activeConnectorIsOutput
						? connectOrDisconnect(activeConnector, clicked)
						: connectOrDisconnect(clicked as IOutput, activeConnector),
				);
			}
		},
		[activeConnectorKey, setConnectionCount],
	);

	const activeConnector = connectorInfo(activeConnectorKey);
	const activeConnectorExists = !!activeConnector;
	const activeConnectorIsOutput =
		activeConnectorExists &&
		'type' in activeConnector[0] &&
		activeConnector[0].type === IoType.output;
	const activeConnectorIsInput =
		activeConnectorExists && !activeConnectorIsOutput;

	const connectedToActiveConnector = useMemo(() => {
		if (!activeConnectorKey || !activeConnector) {
			return [];
		}

		return [...activeConnector[1]]
			.map((key) => connectionInfo(key))
			.map(([output, input]) =>
				activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
			);
	}, [activeConnectorKey]);

	return (
		<ConnectionContext.Provider
			value={{
				connectedToActiveConnector,
				connectorCount,
				connectionCount,
				highlightInputs: activeConnectorIsOutput,
				highlightOutputs: activeConnectorIsInput,
				registerConnector,
				unregisterConnector,
				clickConnector,
				deactivateConnector,
			}}
		>
			{children}
		</ConnectionContext.Provider>
	);
};
