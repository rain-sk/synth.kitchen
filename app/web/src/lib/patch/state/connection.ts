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

const buttonCache: Record<string, HTMLButtonElement> = {};
let timeout: any;
(function buttonCacheCleanup() {
	Object.keys(buttonCache).forEach((key) => {
		if (!document.getElementById(key)) {
			delete buttonCache[key];
		}
	});
	clearTimeout(timeout);
	timeout = setTimeout(buttonCacheCleanup, 60000);
})();
export const connectorButton = (
	key: string,
): HTMLButtonElement | undefined => {
	const cached = buttonCache[key];
	if (cached?.isConnected) {
		return cached;
	}

	const button = document.getElementById(key);
	if (!button) {
		delete buttonCache[key];
		return undefined;
	}

	buttonCache[key] = button as HTMLButtonElement;
	return buttonCache[key];
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
		console.warn('disconnect: connection already gone', key);
		return { connections, connectors };
	}

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);

	const newConnectionsState = Object.fromEntries(
		Object.entries(connections.state).filter(
			([existingKey]) => existingKey !== key,
		),
	);

	const outputInfo = connectors[outputKey];
	const inputInfo = connectors[inputKey];

	if (!outputInfo || !inputInfo) {
		console.warn('disconnect: connector already gone', {
			outputKey,
			inputKey,
		});
		return {
			connections: {
				version: CONNECTIONS_STATE_VERSIONS[0],
				state: newConnectionsState,
			},
			connectors,
		};
	}

	output = outputInfo[0] as Output;
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
			console.info('Suppressed expected InvalidAccessError');
		} else {
			console.error(e);
		}
	}

	const outputConnections = outputInfo[1].filter(
		(existingKey) => existingKey !== key,
	);
	const inputConnections = inputInfo[1].filter(
		(existingKey) => existingKey !== key,
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
