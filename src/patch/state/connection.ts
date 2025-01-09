import {
	IConnector,
	IConnectorInfo,
	IInput,
	ioKey,
	IOutput,
} from './types/connection';
import { paramKey } from './types/parameter';

export const connectorInfo = (
	connectors: Record<string, IConnectorInfo>,
	key: string,
) => {
	const info = connectors[key];
	if (!info) {
		throw Error(`Info for connector with key ${key} not found`);
	}
	return info;
};

export const connectorKey = (connector: IConnector) =>
	'type' in connector ? ioKey(connector) : paramKey(connector);

export const connectorButton = (key: string) => {
	const button = document.getElementById(key) as HTMLButtonElement;
	if (!button) {
		throw Error(`Button for connector with key '${key}' not found`);
	}
	return button;
};

export const connectorButtonExists = (key: string) =>
	document.getElementById(key) !== undefined;

export const moduleConnectors = (
	connectors: Record<string, IConnectorInfo>,
	moduleKey: string,
) => {
	return Object.entries(connectors)
		.filter(([, [connector]]) => connector.moduleKey === moduleKey)
		.map(([key]) => key);
};

export const connectionKey = (output: IOutput, input: IInput) => {
	return `${connectorKey(output)}|${connectorKey(input)}`;
};

export const connectionInfo = (
	connections: Record<string, [IOutput, IInput]>,
	connectionKey: string,
): [IOutput, IInput] => {
	const connection = connections[connectionKey];

	if (!connection) {
		throw Error(`Connection with key ${connectionKey} not found`);
	}

	return connection;
};

export const connect = (
	connections: Record<string, [IOutput, IInput]>,
	connectors: Record<string, IConnectorInfo>,
	output: IOutput,
	input: IInput,
): {
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
} => {
	output.accessor().connect(input.accessor() as any);

	const key = connectionKey(output, input);

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);

	return {
		connections: {
			...connections,
			[key]: [output, input],
		},
		connectors: {
			...connectors,
			[outputKey]: [output, [...connectorInfo(connectors, outputKey)[1], key]],
			[inputKey]: [input, [...connectorInfo(connectors, inputKey)[1], key]],
		},
	};
};

export const disconnectSet = (
	connections: Record<string, [IOutput, IInput]>,
	connectors: Record<string, IConnectorInfo>,
	connectionsToDisconnect: string[],
) => {
	connectionsToDisconnect.forEach((key: string) => {
		const [output, input] = connections[key];
		const { connections: newConnections, connectors: newConnectors } =
			disconnect(connections, connectors, output, input);
		connections = newConnections;
		connectors = newConnectors;
	});
	return { connections, connectors };
};

export const disconnect = (
	connections: Record<string, [IOutput, IInput]>,
	connectors: Record<string, IConnectorInfo>,
	output: IOutput,
	input: IInput,
): {
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
} => {
	try {
		output.accessor().disconnect(input.accessor() as any);
	} catch (e) {
		// In dev-mode, React.StrictMode invokes reducers twice to surface behaviors
		// which rely on side-effects. Trying to disconnect a non-existent connection
		// leads to a DOMException in standardized-audio-context, so we catch the
		// exception to avoid crashing.
		console.warn(e);
	}

	const key = connectionKey(output, input);

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);
	const outputConnections = connectorInfo(connectors, outputKey)[1].filter(
		(existingKey) => existingKey !== key,
	);
	const inputConnections = connectorInfo(connectors, inputKey)[1].filter(
		(existingKey) => existingKey !== key,
	);

	return {
		connections: Object.fromEntries(
			Object.entries(connections).filter(
				([existingKey]) => existingKey !== key,
			),
		),
		connectors: {
			...connectors,
			[outputKey]: [output, outputConnections],
			[inputKey]: [input, inputConnections],
		},
	};
};

export const connectOrDisconnect = (
	connections: Record<string, [IOutput, IInput]>,
	connectors: Record<string, IConnectorInfo>,
	output: IOutput,
	input: IInput,
): {
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
} =>
	connectionKey(output, input) in connections
		? disconnect(connections, connectors, output, input)
		: connect(connections, connectors, output, input);
