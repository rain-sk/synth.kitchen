import * as React from "react";
import { useDispatch } from "react-redux";
import { useFlux } from "use-flux";

import { ConnectionStore, IEnd } from "../flux/connections";
import { ConnectorType } from "./module";
import { modules } from "../components/module-map";
import {
  activate,
  deactivate,
  connect,
  disconnect
} from "../../state/ducks/connections";
import { IModule, IConnector } from "../components/module";

export interface IConnectorProps extends IEnd {
  name: string;
  type: ConnectorType;
}

// TODO: Should the types live here? maybe needs own file for types/model?
export type ConnectionAction =
  | "ACTIVATE"
  | "DEACTIVATE"
  | "CONNECT"
  | "DISCONNECT";

export interface IConnectionState {
  connections: IConnection[];
  active: IEnd | undefined;
}

export type ConnectionType = "MIDI" | "SIGNAL";

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

export const Connector: React.FunctionComponent<IConnectorProps> = props => {
  const dispatch = useDispatch();

  const { click, state } = useFlux(ConnectionStore, ({ state, dispatch }) => {
    return {
      click: (payload: IEnd) => {
        dispatch({ type: "CLICK", payload });
      },
      state
    };
  });

  const action = determineClickAction(modules, state, props);

  const handleClick = React.useCallback(() => {
    dispatch(action.action);
    click({ ...props });
  }, [click, props]);
  console.log(props);

  // check if a connector is currently activated for connection, and if this instance is the active one
  const isActive =
    state.active && state.active.connectorId === props.connectorId;

  return (
    <button
      id={props.connectorId}
      type="button"
      className={`connector ${props.type} ${isActive && "active"}`}
      onClick={handleClick}
    >
      <span className="visually-hidden">{props.name}</span>
      <span>{action.type}</span>
    </button>
  );
};

// Determine which action should be executed when the connector is clicked
function determineClickAction(
  modules: Map<string, IModule>,
  state: IConnectionState,
  payload: IEnd
) {
  console.log({ modules, state, payload });
  const active = state.active;
  // if no connector is active yet, activate this one
  if (!active) {
    return {
      type: "ACTIVATE",
      action: activate(payload)
    };
  } else {
    // get the activated module, and the module in which this connector lives (might be the same)
    const activeModule = modules.get(active.moduleKey);
    const thisModule = modules.get(payload.moduleKey);
    console.log({ activeModule, thisModule });

    // only proceed if an active module and this module exist.
    // TODO: Is this check neccessary?
    if (activeModule && thisModule) {
      if (activeModule.moduleKey === thisModule.moduleKey) {
        return {
          type: "DEACTIVATE",
          action: deactivate(payload)
        };
      }
      const sourceEnd = state.connections
        .map(connection => connection.source)
        .find(
          connection =>
            connection.connectorId === active.connectorId ||
            connection.connectorId === payload.connectorId
        );
      const destinationEnd = state.connections
        .map(connection => connection.destination)
        .find(
          connection =>
            connection.connectorId === active.connectorId ||
            connection.connectorId === payload.connectorId
        );
      if (sourceEnd && destinationEnd) {
        const connection = state.connections.find(
          con =>
            con.source.connectorId === sourceEnd.connectorId &&
            con.destination.connectorId === destinationEnd.connectorId
        );
        const sourceConnector = [
          ...(activeModule.connectors || []),
          ...(thisModule.connectors || [])
        ].find(
          connector =>
            (connector.type === "MIDI_OUT" ||
              connector.type === "SIGNAL_OUT") &&
            connector.id === sourceEnd.connectorId
        );
        const destinationConnector = [
          ...(activeModule.connectors || []),
          ...(thisModule.connectors || [])
        ].find(
          connector =>
            (connector.type === "MIDI_IN" ||
              connector.type === "SIGNAL_IN" ||
              connector.type == "CV_IN") &&
            connector.id === destinationEnd.connectorId
        );
        if (connection && sourceConnector && destinationConnector) {
          const disconnectPayload: IConnectPayload = {
            connection,
            sourceConnector,
            destinationConnector
          };
          return {
            type: "DISCONNECT",
            action: disconnect(disconnectPayload)
          };
        }
      } else if (active.connectorId !== payload.connectorId) {
        const sourceConnector = [
          ...(activeModule.connectors || []),
          ...(thisModule.connectors || [])
        ].find(
          connector =>
            (connector.type === "MIDI_OUT" ||
              connector.type === "SIGNAL_OUT") &&
            (connector.id === active.connectorId ||
              connector.id === payload.connectorId)
        );
        const destinationConnector = [
          ...(activeModule.connectors || []),
          ...(thisModule.connectors || [])
        ].find(
          connector =>
            (connector.type === "MIDI_IN" ||
              connector.type === "SIGNAL_IN" ||
              connector.type === "CV_IN") &&
            (connector.id === active.connectorId ||
              connector.id === payload.connectorId)
        );
        if (sourceConnector && destinationConnector) {
          let type: ConnectionType = "MIDI";
          if (
            sourceConnector.type === "SIGNAL_OUT" &&
            (destinationConnector.type === "SIGNAL_IN" ||
              destinationConnector.type === "CV_IN")
          ) {
            type = "SIGNAL";
          } else if (
            sourceConnector.type !== "MIDI_OUT" ||
            destinationConnector.type !== "MIDI_IN"
          ) {
            return {
              type: "DEACTIVATE",
              action: deactivate(payload)
            };
          }
          const source: IEnd =
            sourceConnector.id === active.connectorId ? active : payload;
          const destination: IEnd =
            destinationConnector.id === active.connectorId ? active : payload;
          return {
            type: "CONNECT",
            action: connect({
              connection: {
                type,
                source,
                destination
              },
              sourceConnector,
              destinationConnector
            })
          };
        }
      }
    }

    // If all else fails
    return { type: "DEACTIVATE" };
  }
}
