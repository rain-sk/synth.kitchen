import { DELAY_STATE, DELAY_STATE_VERSIONS } from "synth.kitchen-shared";

export function needsUpgrade(state: DELAY_STATE[keyof DELAY_STATE]) {
  return state.version !== DELAY_STATE_VERSIONS[0];
}

export function upgrade(
  state: DELAY_STATE[keyof DELAY_STATE]
): DELAY_STATE[DELAY_STATE_VERSIONS[0]] {
  if (!state.version && "delayTime" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === DELAY_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. DELAY state: ${JSON.stringify(
      state
    )}.`
  );
}
