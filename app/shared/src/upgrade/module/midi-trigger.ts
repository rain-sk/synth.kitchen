import {
  MIDI_TRIGGER_STATE,
  MIDI_TRIGGER_STATE_VERSIONS,
} from "../../types/patch/module";

export function needsUpgrade(
  state: MIDI_TRIGGER_STATE[keyof MIDI_TRIGGER_STATE]
) {
  return state.version !== MIDI_TRIGGER_STATE_VERSIONS[0];
}

export function upgrade(
  state: MIDI_TRIGGER_STATE[keyof MIDI_TRIGGER_STATE]
): MIDI_TRIGGER_STATE[MIDI_TRIGGER_STATE_VERSIONS[0]] {
  if (!state.version && "input" in state && "note" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case MIDI_TRIGGER_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. MIDI_TRIGGER state: ${JSON.stringify(
      state
    )}.`
  );
}
