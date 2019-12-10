
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

export type ModuleType = 'GLOBAL_CONTEXT' | 'GAIN' | 'DELAY' | 'FILTER' | 'MIDI_DEVICE' | 'OSCILLATOR' | 'SEQUENCER' | 'MIDI_OSCILLATOR';

export type ConnectorType = 'CV_IN' | 'SIGNAL_IN' | 'SIGNAL_OUT' | 'MIDI_IN' | 'MIDI_OUT' | 'uninitialized';

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
