import {
  ENVELOPE_STATE,
  ENVELOPE_STATE_VERSIONS,
} from "../../types/patch/module";

export function needsUpgrade(state: ENVELOPE_STATE[keyof ENVELOPE_STATE]) {
  return state.version !== ENVELOPE_STATE_VERSIONS[0];
}

export function upgrade(
  state: ENVELOPE_STATE[keyof ENVELOPE_STATE]
): ENVELOPE_STATE[ENVELOPE_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "gate" in state &&
    "attack" in state &&
    "decay" in state &&
    "sustain" in state &&
    "release" in state &&
    "peak" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === ENVELOPE_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. ENVELOPE state: ${JSON.stringify(
      state
    )}.`
  );
}
