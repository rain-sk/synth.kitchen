import { IConnector } from '../ui/patch-module';

export type ConnectionAction = 'ACTIVATE' | 'DEACTIVATE' | 'CLICK' | 'CLEAR' | 'CONNECT' | 'DISCONNECT';

export type ConnectionType = 'MIDI' | 'MOUSE' | 'SIGNAL';

export interface IEnd {
	moduleKey: string;
	connectorId: string;
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
