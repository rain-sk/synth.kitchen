import {
  MIDI_CLOCK_STATE,
  MIDI_CLOCK_STATE_VERSIONS,
} from "synth.kitchen-shared";

export function needsUpgrade(state: MIDI_CLOCK_STATE[keyof MIDI_CLOCK_STATE]) {
  return state.version !== MIDI_CLOCK_STATE_VERSIONS[0];
}

export function upgrade(
  state: MIDI_CLOCK_STATE[keyof MIDI_CLOCK_STATE]
): MIDI_CLOCK_STATE[MIDI_CLOCK_STATE_VERSIONS[0]] {
  if (!state.version) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === MIDI_CLOCK_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. MIDI_CLOCK state: ${JSON.stringify(
      state
    )}.`
  );
}
