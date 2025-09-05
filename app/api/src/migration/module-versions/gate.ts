import { GATE_STATE_VERSIONS, GATE_STATE } from "synth.kitchen-shared";

export function needsUpgrade(state: GATE_STATE[keyof GATE_STATE]) {
  return state.version !== GATE_STATE_VERSIONS[0];
}

export function upgrade(
  state: GATE_STATE[keyof GATE_STATE]
): GATE_STATE[GATE_STATE_VERSIONS[0]] {
  if (!state.version && "gate" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  if (state.version === GATE_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. GATE state: ${JSON.stringify(
      state
    )}.`
  );
}
