import {
  OSCILLATOR_STATE,
  OSCILLATOR_STATE_VERSIONS,
} from "synth.kitchen-shared";

export function needsUpgrade(state: OSCILLATOR_STATE[keyof OSCILLATOR_STATE]) {
  return state.version !== OSCILLATOR_STATE_VERSIONS[0];
}

export function upgrade(
  state: OSCILLATOR_STATE[keyof OSCILLATOR_STATE]
): OSCILLATOR_STATE[OSCILLATOR_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "frequency" in state &&
    "detune" in state &&
    "waveform" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case OSCILLATOR_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. OSCILLATOR state: ${JSON.stringify(
      state
    )}.`
  );
}
