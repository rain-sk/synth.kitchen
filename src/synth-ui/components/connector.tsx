import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IModule, ConnectorType } from "./module";
import { modules } from "./module-map";

import { RootState } from "../../store/ducks";
import {
  IEnd,
  actionCreators,
  ConnectionType,
  IConnectPayload
} from "../../store/ducks/patch";

export interface IConnectorProps extends IEnd {
  name: string;
  type: ConnectorType;
}

export const Connector: React.FunctionComponent<IConnectorProps> = props => {
  const state = useSelector((state: RootState) => state.connections);

  const dispatch = useDispatch();

  // regenerate all connections when connection state changes. remove on unmount
  useEffect(() => {
    console.log("Connector says hello!");

    // Find all connections in which this connector is participating
    const isInput = isInputHelper(props.type);
    const thisConnectorsConnections = state.connections
      .filter(
        connection =>
          isInput && connection.destination.moduleKey === props.moduleKey // if this is an input, find all connections pointing here
      )
      .map(connection => {
        const sourceModule = modules.get(connection.source.moduleKey);
        const destinationModule = modules.get(connection.destination.moduleKey);
        // TODO: If there is a connection, is it really needed to check if it's in a module?
        if (
          sourceModule &&
          destinationModule &&
          sourceModule.connectors &&
          destinationModule.connectors
        ) {
          const sourceConnector = sourceModule.connectors.find(
            connector => connector.id === connection.source.connectorId
          );
          const destinationConnector = destinationModule.connectors.find(
            connector => connector.id === connection.destination.connectorId
          );
          return {
            sourceConnector,
            destinationConnector
          };
        }
      });
    // connect the connections
    thisConnectorsConnections.forEach(connection => {
      if (
        connection &&
        connection.sourceConnector &&
        connection.destinationConnector
      ) {
        connection.sourceConnector
          .getter()
          .connect(connection.destinationConnector.getter());
      }
    });
    return () => {
      console.log("Connector says goodbye!");
      // do stuff to disconnect
      thisConnectorsConnections.forEach(connection => {
        if (
          connection &&
          connection.sourceConnector &&
          connection.destinationConnector
        ) {
          try {
            connection.sourceConnector
              .getter()
              .disconnect(connection.destinationConnector.getter());
          } catch (e) {
            if (e.name === "InvalidAccessError") {
              console.log(
                "Tried to disconnect something that wasn't connected"
              );
            } else {
              throw e;
            }
          }
        }
      });
    };
  }, [state.connections]);

  const clickAction = determineClickAction(modules, state, props);

  const handleClick = React.useCallback(() => {
    dispatch(clickAction.action);
  }, [clickAction, props]);

  // Check if a connector is currently activated for connection, and if this instance is the active one
  const isActive =
    state.active && state.active.connectorId === props.connectorId;

  const canBeTargeted =
    clickAction.type === "CONNECT" || clickAction.type === "DISCONNECT";

  return (
    <button
      id={props.connectorId}
      type="button"
      className={`connector ${props.type} ${isActive &&
        "active"} ${canBeTargeted && "can-target"}`}
      onClick={handleClick}
    >
      <span className="visually-hidden">{props.name}</span>
      <span style={{ left: "20px", position: "relative" }}>
        {clickAction.type}
      </span>
    </button>
  );
};

// Determine which action should be executed when the connector is clicked
function determineClickAction(
  modules: Map<string, IModule>,
  state: RootState["connections"],
  payload: IEnd
) {
  const active = state.active;
  // If no connector is active yet, activate this one
  if (!active) {
    return {
      type: "ACTIVATE",
      action: actionCreators.activate(payload)
    };
  } else {
    // Get the activated module, and the module in which this connector lives (might be the same)
    const activeModule = modules.get(active.moduleKey);
    const thisModule = modules.get(payload.moduleKey);

    // Only proceed if an active module and this module exist.
    // TODO: Is this check neccessary?
    if (activeModule && thisModule) {
      if (activeModule.moduleKey === thisModule.moduleKey) {
        return {
          type: "DEACTIVATE",
          action: actionCreators.deactivate(payload)
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
            action: actionCreators.disconnect(disconnectPayload)
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
              action: actionCreators.deactivate(payload)
            };
          }
          const source: IEnd =
            sourceConnector.id === active.connectorId ? active : payload;
          const destination: IEnd =
            destinationConnector.id === active.connectorId ? active : payload;
          return {
            type: "CONNECT",
            action: actionCreators.connect({
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
    return {
      type: "DEACTIVATE",
      action: actionCreators.deactivate(payload)
    };
  }
}

function isInputHelper(connectorType: ConnectorType) {
  switch (connectorType) {
    case "MIDI_IN":
      return true;
    case "SIGNAL_IN":
      return true;
    case "CV_IN":
      return true;
    default:
      return false;
  }
}
