import { ModuleType, PATCH_STATE, PatchState } from "../types";
import {
  Connection,
  CONNECTIONS_STATE,
  CONNECTIONS_STATE_VERSIONS,
  Connector,
  Input,
  ioKey,
  Output,
  paramKey,
} from "../types/patch/connection";

export function connectionsStateNeedsUpgrade(
  state: CONNECTIONS_STATE[keyof CONNECTIONS_STATE]
) {
  return state.version !== CONNECTIONS_STATE_VERSIONS[0];
}

const connectorKey = (connector: Connector) =>
  "type" in connector ? ioKey(connector) : paramKey(connector);

const connectionKey = (output: Output, input: Input) => {
  return `${connectorKey(output)}|${connectorKey(input)}`;
};

export function upgradeConnectionsState(
  state: PATCH_STATE[keyof PATCH_STATE]
): CONNECTIONS_STATE[CONNECTIONS_STATE_VERSIONS[0]] {
  let connections = state.connections;
  switch (connections.version) {
    case undefined:
    case "0.5.5": {
      connections = {
        version: "0.5.6",
        state: Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== "version")
        ),
      };
    }

    case "0.5.6": {
      connections = {
        version: "0.5.7",
        state: Object.fromEntries(
          Object.entries(connections.state).map(([key, [output, input]]) => {
            const inputModule = state.modules[input.moduleId];
            if (
              "name" in input &&
              input.name === "gate" &&
              inputModule.type !== ModuleType.GATE
            ) {
              input = {
                ...input,
                name: "hold",
              };
              key = connectionKey(output, input);
            }
            const connection: Connection = [output, input];
            return [key, connection];
          })
        ),
      };
    }

    case "0.5.7":
    case CONNECTIONS_STATE_VERSIONS[0]:
      return connections;
  }

  throw new Error(
    `Unable to upgrade given state object. Connections state: ${JSON.stringify(
      state
    )}.`
  );
}
