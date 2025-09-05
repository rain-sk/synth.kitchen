import { FILTER_STATE, FILTER_STATE_VERSIONS } from "../../types/patch/module";

export function needsUpgrade(state: FILTER_STATE[keyof FILTER_STATE]) {
  return state.version !== FILTER_STATE_VERSIONS[0];
}

export function upgrade(
  state: FILTER_STATE[keyof FILTER_STATE]
): FILTER_STATE[FILTER_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "frequency" in state &&
    "detune" in state &&
    "Q" in state &&
    "gain" in state &&
    "type" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === FILTER_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. FILTER state: ${JSON.stringify(
      state
    )}.`
  );
}
