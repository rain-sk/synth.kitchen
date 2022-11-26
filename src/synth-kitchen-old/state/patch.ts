export type ConnectionType = 'MIDI' | 'MOUSE' | 'SIGNAL';

export interface IEnd {
	moduleKey: string;
	connectorId: string;
}

export interface IConnector {
	id: string;
	name: string;
	type: ConnectorType;
	getter: () => any;
}

export interface IModule {
	moduleKey: string;
	type: ModuleType;
	initialized?: boolean;
	node?: any;
	connectors?: IConnector[];
}

export interface IConnection {
	type: ConnectionType;
	source: IEnd;
	destination: IEnd;
}

export interface IConnectPayload {
	connection: IConnection;
	sourceConnector: IConnector;
	destinationConnector: IConnector;
}

export interface IConnectionState {
	connections: IConnection[];
	active: IEnd | undefined;
}

export type ModuleType =
	| 'DELAY'
	| 'FILTER'
	| 'GAIN'
	| 'OSCILLATOR'
	| 'OUTPUT'
	| 'SEQUENCER';

export type ConnectorType =
	| 'CV_IN'
	| 'MIDI_IN'
	| 'MIDI_OUT'
	| 'SIGNAL_IN'
	| 'SIGNAL_OUT'
	| 'uninitialized';

export interface IModuleProps {
	moduleKey: string;
	removeModule: (moduleKey: string) => void;
}

export interface IConnector {
	id: string;
	name: string;
	type: ConnectorType;
	getter: () => any;
}

export interface IModule {
	moduleKey: string;
	type: ModuleType;
	initialized?: boolean;
	node?: any;
	connectors?: IConnector[];
}

export interface IModuleState {
	module?: IModule;
}
