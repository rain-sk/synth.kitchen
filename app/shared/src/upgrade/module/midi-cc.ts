import {
  MIDI_CC_STATE,
  MIDI_CC_STATE_VERSIONS,
} from "../../types/patch/module";

export function needsUpgrade(state: MIDI_CC_STATE[keyof MIDI_CC_STATE]) {
  return state.version !== MIDI_CC_STATE_VERSIONS[0];
}

export function upgrade(
  state: MIDI_CC_STATE[keyof MIDI_CC_STATE]
): MIDI_CC_STATE[MIDI_CC_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "input" in state &&
    "cc" in state &&
    "min" in state &&
    "max" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0": {
      state = {
        ...state,
        version: "0.5.9",
        channel: 1,
      };
    }

    case "0.5.9":
    case MIDI_CC_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. MIDI_CC state: ${JSON.stringify(
      state
    )}.`
  );
}
