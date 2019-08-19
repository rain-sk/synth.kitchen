import { createStandardAction, createReducer } from "typesafe-actions";

import { modules } from "../../synth-ui/components/module-map";
import { IConnector } from "../../synth-ui/components/module";

export type ConnectionType = "MIDI" | "SIGNAL";

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
  ACTIVATE = "connections/ACTIVATE",
  DEACTIVATE = "connections/DEACTIVATE",
  CLEAR = "connections/CLEAR",
  CONNECT = "connections/CONNECT",
  DISCONNECT = "connections/DISCONNECT"
}

// Action Creators (Standard Flux Action)
const activate = createStandardAction(ActionTypes.ACTIVATE)<IEnd>();
const deactivate = createStandardAction(ActionTypes.DEACTIVATE)<IEnd>();
const clear = createStandardAction(ActionTypes.CLEAR)<string>();
const connect = createStandardAction(ActionTypes.CONNECT)<IConnectPayload>();
const disconnect = createStandardAction(ActionTypes.DISCONNECT)<
  IConnectPayload
>();

export const actionCreators = {
  activate,
  deactivate,
  clear,
  connect,
  disconnect
};

// Reducers
export const connectionReducer = createReducer<IConnectionState>({
  active: undefined,
  connections: []
})
  .handleAction(activate, (state, { payload }: { payload: IEnd }) => {
    return { ...state, active: payload };
  })
  .handleAction(deactivate, state => ({ ...state, active: undefined }))
  .handleAction(clear, (state, { payload }: { payload: string }) => {
    const module = modules.get(payload);
    if (module) {
      const connections = state.connections.filter(
        connection =>
          connection.source.moduleKey === module.moduleKey ||
          connection.destination.moduleKey === module.moduleKey
      );
      const remove: IConnection[] = [];
      connections.forEach(connection => {
        remove.push(connection);
      });
      modules.delete(payload);
      return {
        ...state,
        connections: state.connections.filter(
          connection =>
            !remove.some(
              toBeRemoved =>
                toBeRemoved.source.connectorId ===
                  connection.source.connectorId &&
                toBeRemoved.destination.connectorId ===
                  connection.destination.connectorId
            )
        ),
        active: undefined
      };
    }

    return {
      ...state,
      active: undefined
    };
  })
  .handleAction(connect, (state, { payload }: { payload: IConnectPayload }) => {
    const { connection } = payload;
    return {
      ...state,
      connections: [...state.connections, connection],
      active: undefined
    };
  })
  .handleAction(
    disconnect,
    (state, { payload }: { payload: IConnectPayload }) => {
      const { connection } = payload;
      return {
        ...state,
        connections: state.connections.filter(
          con =>
            con.source.connectorId !== connection.source.connectorId ||
            con.destination.connectorId !== connection.destination.connectorId
        ),
        active: undefined
      };
    }
  );
