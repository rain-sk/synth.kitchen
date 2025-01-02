import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { IIo, IoType, ioKey } from '../state/types/io';
import { IParameter, paramKey } from '../state/types/parameter';
import { usePatch } from '../hooks/use-patch';

export type IOutput = IIo;
export type IInput = IIo | IParameter;
export type IConnector = IOutput | IInput;

type IConnectorInfo = [IConnector, Set<string>];

const connections = new Map<string, [IOutput, IInput]>();
const connectors = new Map<string, IConnectorInfo>();
const connectorButtons = new Map<string, HTMLButtonElement>();

export const connectorInfo = (key?: string) =>
	key && connectors.has(key) ? connectors.get(key) : undefined;

export const connectorKey = (connector: IConnector) =>
	'type' in connector ? ioKey(connector) : paramKey(connector);

export const connectorButton = (key: string) => {
	if (!connectorButtons.has(key)) {
		const button = document.getElementById(key);
		if (button) {
			connectorButtons.set(key, button as HTMLButtonElement);
		} else {
			throw new Error(`connector with key '${key}' not found`);
		}
	}
	return connectorButtons.get(key) as HTMLButtonElement | undefined;
};

const connectionKey = (output: IOutput, input: IInput) => {
	if (!('type' in output) || output.type === IoType.input) {
		throw 'Invalid output';
	}

	if ('type' in input && input.type === IoType.output) {
		throw 'Invalid input';
	}

	return `${connectorKey(output)}|${connectorKey(input)}`;
};

const connectOrDisconnect = (output: IOutput, input: IInput) => {
	const outputInfo = connectorInfo(connectorKey(output));
	const inputInfo = connectorInfo(connectorKey(input));

	if (!outputInfo) {
		throw 'Unregistered output';
	}
	if (!inputInfo) {
		throw 'Unregistered info';
	}

	const key = connectionKey(output, input);

	if (connections.has(key)) {
		connections.delete(key);

		outputInfo[1].delete(key);
		inputInfo[1].delete(key);

		output.accessor().disconnect(input.accessor() as any);
	} else {
		output.accessor().connect(input.accessor() as any);

		outputInfo[1].add(key);
		inputInfo[1].add(key);

		connections.set(key, [output, input]);
	}

	return connections.size;
};

type IConnectionContext = {
	activeConnectorKey?: string;
	readonly connections: Map<string, [IOutput, IInput]>;
	readonly connectors: Map<string, IConnectorInfo>;
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
	connections: new Map<string, [IOutput, IInput]>(),
	connectors: new Map<string, IConnectorInfo>(),
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
	const [activeConnectorKey, setActiveConnectorKey] = useState<string>();

	const [connectorCount, setConnectorCount] = useState(0);
	const [connectionCount, setConnectionCount] = useState(0);

	const { connectionsToLoad } = usePatch();
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
						Object.entries(connectionsToLoadRef.current).filter(
							([, [output, input]]) => {
								return (
									connectorInfo(connectorKey(output)) &&
									connectorInfo(connectorKey(input))
								);
							},
						),
					);
					connectionsToLoadRef.current = Object.fromEntries(
						Object.entries(connectionsToLoadRef.current).filter(([key]) => {
							return !toLoad[key];
						}),
					);

					Object.values(toLoad).forEach(([output, input]) => {
						output = (
							connectors.get(connectorKey(output)) as any
						)[0] as IOutput;
						input = (connectors.get(connectorKey(input)) as any)[0] as IInput;
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
			connectors.set(connectorKey(connector), [connector, new Set<string>()]);

			setConnectorCount(connectors.size);
		},
		[setConnectorCount],
	);

	const unregisterConnector = useCallback(
		(connector: IConnector) => {
			const key = connectorKey(connector);
			const info = connectorInfo(key);
			if (!info) {
				throw 'Unregistering connector which was not registered';
			}

			info[1].forEach((connectionKey) => {
				const connection = connections.get(connectionKey);
				if (connection) {
					const [output, input] = connection;
					connectOrDisconnect(output, input);
				}
			});

			connectors.delete(key);
			connectorButtons.delete(key);

			setConnectorCount(connectors.size);
			setConnectionCount(connections.size);
		},
		[setConnectorCount],
	);

	const deactivateConnector = useCallback(() => {
		setActiveConnectorKey(undefined);
	}, []);

	const clickConnector = useCallback(
		(clicked: IConnector) => {
			const active = connectorInfo(activeConnectorKey);

			if (!active) {
				setActiveConnectorKey(connectorKey(clicked));
				return;
			}
			setActiveConnectorKey(undefined);

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
		[activeConnectorKey, setActiveConnectorKey, setConnectionCount],
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
			.map((key) => connections.get(key) as [IIo, IInput])
			.map(([output, input]) =>
				activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
			);
	}, [activeConnectorKey]);

	return (
		<ConnectionContext.Provider
			value={{
				activeConnectorKey,
				connectedToActiveConnector,
				connectorCount,
				connectionCount,
				connectors,
				connections,
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
