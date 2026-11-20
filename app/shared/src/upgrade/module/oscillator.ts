import {
  OSCILLATOR_STATE,
  OSCILLATOR_STATE_VERSIONS,
} from "../../types/patch/module";
import { splitCents } from "./cents";

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
    case "0.5.0": {
      const { transpose, detune } = splitCents(state.detune);
      const newState: OSCILLATOR_STATE["0.5.2"] = {
        ...state,
        version: "0.5.2",
        transpose,
        detune,
      };
      state = newState;
    }

    case "0.5.2": {
      const newState: OSCILLATOR_STATE["0.5.11"] = {
        ...state,
        version: "0.5.11",
        peak: 1,
      };
      state = newState;
    }

    case "0.5.11": {
      const newState: OSCILLATOR_STATE["0.5.12"] = {
        ...state,
        version: "0.5.12",
        level: state.peak,
      };
      delete (newState as any).peak;
      state = newState;
    }
    case OSCILLATOR_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. OSCILLATOR state: ${JSON.stringify(
      state
    )}.`
  );
}
