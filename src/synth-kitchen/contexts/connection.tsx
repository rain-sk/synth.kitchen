import React, { useCallback, useState } from 'react';
import { IIo, IoType, ioKey } from '../state/types/io';
import { IParameter, paramKey } from '../state/types/parameter';

type IOutput = IIo;
type IInput = IIo | IParameter;
type IConnector = IOutput | IInput;

type IConnectorInfo = [IConnector, Set<string>];

const connections = new Map<string, [IOutput, IInput]>();
const connectors = new Map<string, IConnectorInfo>();

export const connectorKey = (connector: IConnector) =>
	'type' in connector ? ioKey(connector) : paramKey(connector);

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

export const connectorInfo = (key?: string) =>
	key && connectors.has(key) ? connectors.get(key) : undefined;

type IConnectionContext = {
	activeConnectorKey?: string;
	connectorCount: number;
	connectionCount: number;
	highlightInputs: boolean;
	highlightOutputs: boolean;
	registerConnector: (connector: IConnector) => void;
	unregisterConnector: (connector: IConnector) => void;
	clickConnector: (connector: IConnector) => void;
};

export const ConnectionContext = React.createContext<IConnectionContext>({
	connectorCount: 0,
	connectionCount: 0,
	highlightInputs: false,
	highlightOutputs: false,
	registerConnector: () => {},
	unregisterConnector: () => {},
	clickConnector: () => {}
});

export const ConnectionContextProvider: React.FunctionComponent<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [activeConnectorKey, setActiveConnectorKey] = useState<string>();

	const [connectorCount, setConnectorCount] = useState(0);
	const [connectionCount, setConnectionCount] = useState(0);

	const registerConnector = useCallback(
		(connector: IConnector) => {
			connectors.set(connectorKey(connector), [connector, new Set<string>()]);

			setConnectorCount(connectors.size);
		},
		[setConnectorCount]
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

			setConnectorCount(connectors.size);
			setConnectionCount(connections.size);
		},
		[setConnectorCount]
	);

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
						: connectOrDisconnect(clicked as IOutput, activeConnector)
				);
			}
		},
		[activeConnectorKey, setActiveConnectorKey, setConnectionCount]
	);

	const activeConnector = connectorInfo(activeConnectorKey);
	const activeConnectorExists = !!activeConnector;
	const activeConnectorIsOutput =
		activeConnectorExists &&
		'type' in activeConnector[0] &&
		activeConnector[0].type === IoType.output;
	const activeConnectorIsInput =
		activeConnectorExists && !activeConnectorIsOutput;

	return (
		<ConnectionContext.Provider
			value={{
				activeConnectorKey,
				connectorCount,
				connectionCount,
				highlightInputs: activeConnectorIsOutput,
				highlightOutputs: activeConnectorIsInput,
				registerConnector,
				unregisterConnector,
				clickConnector
			}}
		>
			{children}
		</ConnectionContext.Provider>
	);
};
