import {
	IConnector,
	IConnectorInfo,
	IInput,
	ioKey,
	IoType,
	IOutput,
} from './types/connection';
import { paramKey } from './types/parameter';

export const connectorInfo = (
	connectors: Record<string, IConnectorInfo>,
	key: string,
) => {
	const connector = connectors[key];
	if (!connector) {
		throw Error(`Info for connector with key ${key} not found`);
	}
	return connector;
};

export const connectorKey = (connector: IConnector) =>
	'type' in connector ? ioKey(connector) : paramKey(connector);

export const connectionKey = (output: IOutput, input: IInput) => {
	if (!('type' in output) || output.type === IoType.input) {
		throw 'Invalid output';
	}

	if ('type' in input && input.type === IoType.output) {
		throw 'Invalid input';
	}

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
	const key = connectionKey(output, input);

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);
	const outputInfo = connectorInfo(connectors, outputKey);
	const inputInfo = connectorInfo(connectors, inputKey);

	try {
		output.accessor().connect(input.accessor() as any);
	} catch (e) {}

	const outputConnections = new Set([...outputInfo[1], key]);
	const inputConnections = new Set([...inputInfo[1], key]);

	return {
		connections: {
			...connections,
			[key]: [output, input],
		},
		connectors: {
			...connectors,
			[outputKey]: [output, outputConnections],
			[inputKey]: [input, inputConnections],
		},
	};
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
	const key = connectionKey(output, input);

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);
	const outputInfo = connectorInfo(connectors, outputKey);
	const inputInfo = connectorInfo(connectors, inputKey);

	connections = Object.fromEntries(
		Object.entries(connections).filter(([existingKey]) => existingKey !== key),
	);

	const outputConnections = new Set(
		[...outputInfo[1]].filter(([existingKey]) => existingKey !== key),
	);
	const inputConnections = new Set(
		[...inputInfo[1]].filter(([existingKey]) => existingKey !== key),
	);

	try {
		output.accessor().disconnect(input.accessor() as any);
	} catch (e) {}

	return {
		connections,
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
