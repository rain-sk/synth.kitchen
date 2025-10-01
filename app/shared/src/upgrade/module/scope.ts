import { SCOPE_STATE, SCOPE_STATE_VERSIONS } from "../../types/patch/module";

export function needsUpgrade(state: SCOPE_STATE[keyof SCOPE_STATE]) {
  return state.version !== SCOPE_STATE_VERSIONS[0];
}

export function upgrade(
  state: SCOPE_STATE[keyof SCOPE_STATE]
): SCOPE_STATE[SCOPE_STATE_VERSIONS[0]] {
  if (!state.version) {
    state = {
      ...(state as any),
      version: "0.5.7",
    };
  }

  switch (state.version) {
    case "0.5.7":
    case SCOPE_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. SCOPE state: ${JSON.stringify(
      state
    )}.`
  );
}
