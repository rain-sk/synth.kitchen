import { NOISE_STATE, NOISE_STATE_VERSIONS } from "synth.kitchen-shared";

export function needsUpgrade(state: NOISE_STATE[keyof NOISE_STATE]) {
  return state.version !== NOISE_STATE_VERSIONS[0];
}

export function upgrade(
  state: NOISE_STATE[keyof NOISE_STATE]
): NOISE_STATE[NOISE_STATE_VERSIONS[0]] {
  if (!state.version) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case NOISE_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. NOISE state: ${JSON.stringify(
      state
    )}.`
  );
}
