import { createFlux, BaseState } from 'use-flux';
import { modules } from '../unique/module-map';
import { IModule, IConnector } from '../shared/module';

export type ConnectionAction = 'ACTIVATE' | 'DEACTIVATE' | 'CLICK' | 'CLEAR' | 'CONNECT' | 'DISCONNECT';

export type ConnectionType = 'MIDI' | 'SIGNAL';

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

export interface IConnectionState extends BaseState<ConnectionAction> {
	connections: IConnection[];
	active: IEnd | undefined;
}

export const [reducers, ConnectionStore, ConnectionProvider] = createFlux<ConnectionAction, IConnectionState>({ connections: [], active: undefined });

reducers.set('ACTIVATE', (state, payload: IEnd) => {
	return {
		...state,
		active: payload
	};
});

reducers.set('DEACTIVATE', (state) => {
	return {
		...state,
		active: undefined
	};
});

reducers.set('CONNECT', (state, payload: IConnectPayload) => {
	const { connection, sourceConnector, destinationConnector } = payload;
	sourceConnector.getter().connect(destinationConnector.getter());
	return {
		...state,
		connections: [...state.connections, connection],
		dispatchQueue: [{ type: 'DEACTIVATE' }]
	};
});

reducers.set('DISCONNECT', (state, payload: IConnectPayload) => {
	const { connection, sourceConnector, destinationConnector } = payload;
	sourceConnector.getter().disconnect(destinationConnector.getter());
	return {
		...state,
		connections: state.connections.filter(con => (
			con.source.connectorId !== connection.source.connectorId ||
			con.destination.connectorId !== connection.destination.connectorId
		)),
		dispatchQueue: [{ type: 'DEACTIVATE' }]
	};
});

reducers.set('CLEAR', (state, payload: { moduleKey: string }) => {
	const module = modules.get(payload.moduleKey);
	if (module) {
		const connections = state.connections.filter(connection => (
			connection.source.moduleKey === module.moduleKey ||
			connection.destination.moduleKey === module.moduleKey
		));
		const remove: IConnection[] = [];
		connections.forEach(connection => {
			const sourceModule = modules.get(connection.source.moduleKey);
			const destinationModule = modules.get(connection.destination.moduleKey);
			if (sourceModule && destinationModule && sourceModule.connectors && destinationModule.connectors) {
				const sourceConnector = sourceModule.connectors.find(connector => connector.id === connection.source.connectorId);
				const destinationConnector = destinationModule.connectors.find(connector => connector.id === connection.destination.connectorId);
				if (sourceConnector && destinationConnector) {
					sourceConnector.getter().disconnect(destinationConnector.getter());
				}
			}
			remove.push(connection);
		});
		modules.delete(payload.moduleKey);
		return {
			...state,
			connections: state.connections.filter(connection =>
				!remove.some(toBeRemoved => (
					toBeRemoved.source.connectorId === connection.source.connectorId &&
					toBeRemoved.destination.connectorId === connection.destination.connectorId
				))
			),
			dispatchQueue: [{ type: 'DEACTIVATE' }]
		}
	}

	return {
		...state,
		dispatchQueue: [{ type: 'DEACTIVATE' }]
	};
});

reducers.set('CLICK', (state, payload: IEnd) => {
	const action = clickResult(modules, state, payload);

	switch (action.result) {
		case 'ACTIVATE':
			return {
				...state,
				dispatchQueue: [{ type: 'ACTIVATE', payload }]
			};
		case 'DISCONNECT':
			const disconnectPayload = action.disconnectPayload;
			if (disconnectPayload) {
				return {
					...state,
					dispatchQueue: [{ type: 'DISCONNECT', payload: disconnectPayload }]
				};
			} else {
				return {
					...state,
					dispatchQueue: [{ type: 'DEACTIVATE' }]
				};
			}
		case 'CONNECT':
			const connectPayload = action.connectPayload;
			if (connectPayload) {
				return {
					...state,
					dispatchQueue: [{ type: 'CONNECT', payload: connectPayload }]
				};
			} else {
				return {
					...state,
					dispatchQueue: [{ type: 'DEACTIVATE' }]
				};
			}
		default:
			return {
				...state,
				dispatchQueue: [{ type: 'DEACTIVATE' }]
			};
	}
});

function clickResult(modules: Map<string, IModule>, state: IConnectionState, payload: IEnd): { result: ConnectionAction, disconnectPayload?: IConnectPayload, connectPayload?: IConnectPayload } {
	const active = state.active;
	if (!active) {
		return {
			result: 'ACTIVATE'
		};
	} else {
		const activeModule = modules.get(active.moduleKey);
		const clickedModule = modules.get(payload.moduleKey);
		if (activeModule && clickedModule) {
			if (activeModule.moduleKey === clickedModule.moduleKey) {
				return {
					result: 'DEACTIVATE'
				};
			}
			const sourceEnd = state.connections.map(connection => connection.source).find(connection => (
				connection.connectorId === active.connectorId || connection.connectorId === payload.connectorId
			));
			const destinationEnd = state.connections.map(connection => connection.destination).find(connection => (
				connection.connectorId === active.connectorId || connection.connectorId === payload.connectorId
			));
			if (sourceEnd && destinationEnd) {
				const connection = state.connections.find(con => (
					con.source.connectorId === sourceEnd.connectorId &&
					con.destination.connectorId === destinationEnd.connectorId
				));
				const sourceConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
					(connector.type === 'MIDI_OUT' || connector.type === 'SIGNAL_OUT') &&
					(connector.id === sourceEnd.connectorId)
				));
				const destinationConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
					(connector.type === 'MIDI_IN' || connector.type === 'SIGNAL_IN' || connector.type == 'CV_IN') &&
					(connector.id === destinationEnd.connectorId)
				));
				if (connection && sourceConnector && destinationConnector) {
					const disconnectPayload: IConnectPayload = {
						connection,
						sourceConnector,
						destinationConnector
					};
					return {
						result: 'DISCONNECT',
						disconnectPayload
					};
				}
			} else if (active.connectorId !== payload.connectorId) {
				const sourceConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
					(connector.type === 'MIDI_OUT' || connector.type === 'SIGNAL_OUT') &&
					(connector.id === active.connectorId || connector.id === payload.connectorId)
				));
				const destinationConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
					(connector.type === 'MIDI_IN' || connector.type === 'SIGNAL_IN' || connector.type === 'CV_IN') &&
					(connector.id === active.connectorId || connector.id === payload.connectorId)
				));
				if (sourceConnector && destinationConnector) {
					let type: ConnectionType = 'MIDI';
					if (sourceConnector.type === 'SIGNAL_OUT' && (destinationConnector.type === 'SIGNAL_IN' || destinationConnector.type === 'CV_IN')) {
						type = 'SIGNAL';
					} else if (sourceConnector.type !== 'MIDI_OUT' || destinationConnector.type !== 'MIDI_IN') {
						return {
							result: 'DEACTIVATE'
						};
					}
					const source: IEnd = sourceConnector.id === active.connectorId ? active : payload;
					const destination: IEnd = destinationConnector.id === active.connectorId ? active : payload;
					return {
						result: 'CONNECT',
						connectPayload: {
							connection: {
								type,
								source,
								destination
							},
							sourceConnector,
							destinationConnector
						}
					};
				}
			}
		}
	}
	return {
		result: 'DEACTIVATE'
	};
}