import { GAIN_STATE, GAIN_STATE_VERSIONS } from "../../types/patch/module";

export function needsUpgrade(state: GAIN_STATE[keyof GAIN_STATE]) {
  return state.version !== GAIN_STATE_VERSIONS[0];
}

export function upgrade(
  state: GAIN_STATE[keyof GAIN_STATE]
): GAIN_STATE[GAIN_STATE_VERSIONS[0]] {
  if (!state.version && "gain" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === GAIN_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. GAIN state: ${JSON.stringify(
      state
    )}.`
  );
}
