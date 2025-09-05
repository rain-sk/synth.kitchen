import {
  COMPRESSOR_STATE,
  COMPRESSOR_STATE_VERSIONS,
} from "synth.kitchen-shared";

export function needsUpgrade(state: COMPRESSOR_STATE[keyof COMPRESSOR_STATE]) {
  return state.version !== COMPRESSOR_STATE_VERSIONS[0];
}

export function upgrade(
  state: COMPRESSOR_STATE[keyof COMPRESSOR_STATE]
): COMPRESSOR_STATE[COMPRESSOR_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "attack" in state &&
    "release" in state &&
    "knee" in state &&
    "ratio" in state &&
    "threshold" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === COMPRESSOR_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. COMPRESSOR state: ${JSON.stringify(
      state
    )}.`
  );
}
