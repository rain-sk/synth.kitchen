import { Reducer } from 'redux';
import { createStandardAction, createReducer } from 'typesafe-actions';

import { modules } from '../../synth-ui/components/module-map';
import { IModule, IConnector } from '../../synth-ui/components/module';

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

export interface IConnectionState {
    connections: IConnection[];
    active: IEnd | undefined;
}

enum ActionTypes {
    ACTIVATE = 'connections/ACTIVATE',
    DEACTIVATE = 'connections/DEACTIVATE',
    CLEAR = 'connections/CLEAR',
    CONNECT = 'connections/CONNECT',
    DISCONNECT = 'connections/DISCONNECT',
}

// Action Creators (Standard Flux Action)
export const activate = createStandardAction(ActionTypes.ACTIVATE)();
export const deactivate = createStandardAction(ActionTypes.DEACTIVATE)();
export const clear = createStandardAction(ActionTypes.CLEAR)();
export const connect = createStandardAction(ActionTypes.CONNECT)();
export const disconnect = createStandardAction(ActionTypes.DISCONNECT)();

// Reducers
export const connectionReducer = createReducer<IConnectionState>({ active: undefined, connections: [] })
    .handleAction(activate, (state, action) => {
        return ({ ...state })
    })
    .handleAction(deactivate, (state) => (deactivateHelper(state)))
    .handleAction(clear, (state, action) => {
        return ({ ...state })
    })
    .handleAction(connect, (state, action) => {
        return ({ ...state })
    })
    .handleAction(disconnect, (state, action) => {
        return ({ ...state })
    })


function deactivateHelper(state: IConnectionState) {
    return ({ ...state, active: undefined })
}




