import {
	IConnector,
	IConnectorInfo,
	IInput,
	ioKey,
	IoType,
	IOutput,
} from './types/connection';
import { paramKey } from './types/parameter';

const connections = new Map<string, [IOutput, IInput]>();
const connectors = new Map<string, IConnectorInfo>();
const connectorButtons = new Map<string, HTMLButtonElement>();

export const connectionEntries = () =>
	Object.fromEntries(connections.entries());

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

export const connectionInfo = (connectionKey: string): [IOutput, IInput] => {
	const connection = connections.get(connectionKey);
	if (!connection) {
		throw Error('no connection with the given key');
	}
	return connection;
};

export const connectOrDisconnect = (output: IOutput, input: IInput) => {
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

export const doRegisterConnector = (connector: IConnector) => {
	connectors.set(connectorKey(connector), [connector, new Set<string>()]);

	return connectors.size;
};

export const doUnregisterConnector = (connector: IConnector) => {
	const key = connectorKey(connector);
	const info = connectorInfo(key);

	if (!info) {
		throw 'Unregistering connector which was not registered';
	}

	info[1].forEach((connectionKey) => {
		const [output, input] = connectionInfo(connectionKey);
		connectOrDisconnect(output, input);
	});

	connectors.delete(key);
	connectorButtons.delete(key);

	return {
		connectorCount: connectors.size,
		connectionCount: connections.size,
	};
};
