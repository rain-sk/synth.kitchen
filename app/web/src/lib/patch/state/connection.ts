import {
	Connection,
	CONNECTIONS_STATE_VERSIONS,
	ConnectionsState,
	Connector,
	Input,
	ioKey,
	Output,
	paramKey,
} from 'synth.kitchen-shared';

import { ConnectorInfo } from './types/patch';

export const connectorInfo = (
	connectors: Record<string, ConnectorInfo>,
	key: string,
) => {
	const info = connectors[key];
	if (!info) {
		throw Error(`Info for connector with key ${key} not found`);
	}
	return info;
};

export const connectorKey = (connector: Connector) =>
	'type' in connector ? ioKey(connector) : paramKey(connector);

export const connectorButton = (key: string) => {
	const button = document.getElementById(key) as HTMLButtonElement;
	if (!button) {
		// debugger;
		throw Error(`Button for connector with key '${key}' not found`);
	}
	return button;
};

export const moduleConnectors = (
	connectors: Record<string, ConnectorInfo>,
	moduleId: string,
) => {
	return Object.entries(connectors)
		.filter(([, [connector]]) => connector.moduleId === moduleId)
		.map(([key]) => key);
};

export const connectionKey = (output: Output, input: Input) => {
	return `${connectorKey(output)}|${connectorKey(input)}`;
};

export const connectionInfo = (
	connections: ConnectionsState,
	connectionKey: string,
): Connection => {
	const connection = connections.state[connectionKey];

	if (!connection) {
		debugger;
		throw Error(`Connection with key ${connectionKey} not found`);
	}

	return connection;
};

export const connect = (
	connections: ConnectionsState,
	connectors: Record<string, ConnectorInfo>,
	output: Output,
	input: Input,
): {
	connections: ConnectionsState;
	connectors: Record<string, ConnectorInfo>;
} => {
	output.accessor().connect(input.accessor() as any);

	const key = connectionKey(output, input);

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);

	return {
		connections: {
			version: CONNECTIONS_STATE_VERSIONS[0],
			state: {
				...connections.state,
				[key]: [output, input],
			},
		},
		connectors: {
			...connectors,
			[outputKey]: [output, [...connectorInfo(connectors, outputKey)[1], key]],
			[inputKey]: [input, [...connectorInfo(connectors, inputKey)[1], key]],
		},
	};
};

export const disconnectSet = (
	connections: ConnectionsState,
	connectors: Record<string, ConnectorInfo>,
	connectionsToDisconnect: Set<string>,
) => {
	connectionsToDisconnect.forEach((key: string) => {
		const [output, input] = connections.state[key];
		const { connections: newConnections, connectors: newConnectors } =
			disconnect(connections, connectors, output, input);
		connections = newConnections;
		connectors = newConnectors;
	});
	return { connections, connectors };
};

export const disconnect = (
	connections: ConnectionsState,
	connectors: Record<string, ConnectorInfo>,
	output: Output,
	input: Input,
): {
	connections: ConnectionsState;
	connectors: Record<string, ConnectorInfo>;
} => {
	const key = connectionKey(output, input);
	if (!(key in connections.state)) {
		console.error('unregistered connection', key);
		throw Error('disconnecting unregistered connection');
	}

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);

	if (!(outputKey in connectors) || !(inputKey in connectors)) {
		console.error('unregistered connector', {
			outputKey,
			inputKey,
			connectors,
		});
		throw Error('disconnecting one or more unregistered connectors');
	}

	const outputInfo = connectorInfo(connectors, outputKey);
	output = outputInfo[0] as Output;
	const inputInfo = connectorInfo(connectors, inputKey);
	input = inputInfo[0] as Input;

	try {
		output.accessor().disconnect(input.accessor() as any);
	} catch (e) {
		// In dev-mode, React.StrictMode invokes reducers twice to surface behaviors
		// which rely on side-effects. Trying to disconnect a non-existent connection
		// leads to a DOMException in standardized-audio-context, so we catch the
		// exception to avoid crashing.
		if (
			import.meta.env.DEV &&
			e &&
			typeof e === 'object' &&
			'name' in e &&
			e.name === 'InvalidAccessError'
		) {
			console.log('Suppressed expected InvalidAccessError');
			// console.warn(e);
		} else {
			console.error(e);
			// todo: handle actual failure (possibly from corrupted patches)
		}
	}

	const outputConnections = outputInfo[1].filter(
		(existingKey) => existingKey !== key,
	);
	const inputConnections = inputInfo[1].filter(
		(existingKey) => existingKey !== key,
	);

	const newConnectionsState = Object.fromEntries(
		Object.entries(connections.state).filter(
			([existingKey]) => existingKey !== key,
		),
	);

	return {
		connections: {
			version: CONNECTIONS_STATE_VERSIONS[0],
			state: newConnectionsState,
		},
		connectors: {
			...connectors,
			[outputKey]: [output, outputConnections],
			[inputKey]: [input, inputConnections],
		},
	};
};

export const connectOrDisconnect = (
	connections: ConnectionsState,
	connectors: Record<string, ConnectorInfo>,
	output: Output,
	input: Input,
): {
	connections: ConnectionsState;
	connectors: Record<string, ConnectorInfo>;
} =>
	connectionKey(output, input) in connections
		? disconnect(connections, connectors, output, input)
		: connect(connections, connectors, output, input);
