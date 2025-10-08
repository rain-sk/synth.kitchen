import {
  Connection,
  CONNECTIONS_STATE,
  CONNECTIONS_STATE_VERSIONS,
} from "../types/patch/connection";

export function connectionsStateNeedsUpgrade(
  state: CONNECTIONS_STATE[keyof CONNECTIONS_STATE]
) {
  return state.version !== CONNECTIONS_STATE_VERSIONS[0];
}

export function upgradeConnectionsState(
  state: CONNECTIONS_STATE[keyof CONNECTIONS_STATE]
): CONNECTIONS_STATE[CONNECTIONS_STATE_VERSIONS[0]] {
  switch (state.version) {
    case undefined:
      state = {
        ...(state as any),
        version: "0.5.5",
      };
    case "0.5.5": {
      const stateEntries = Object.fromEntries(
        Object.entries(state).filter(([key]) => key !== "version")
      ) as Record<string, Connection>;
      state = {
        version: "0.5.6",
        state: stateEntries,
      };
    }

    case "0.5.6":
    case CONNECTIONS_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. Connections state: ${JSON.stringify(
      state
    )}.`
  );
}
