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

  switch (state.version) {
    case "0.5.0":
      state = {
        ...state,
        version: "0.5.5",
      };
      return state;
    case "0.5.4":
      state = {
        ...state,
        version: "0.5.5",
        gate: state.hold,
      };
      delete (state as any).hold;
      return state;

    case "0.5.5":
    case ENVELOPE_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. ENVELOPE state: ${JSON.stringify(
      state
    )}.`
  );
}
