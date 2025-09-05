import { SHIFT_STATE, SHIFT_STATE_VERSIONS } from "synth.kitchen-shared";

export function needsUpgrade(state: SHIFT_STATE[keyof SHIFT_STATE]) {
  return state.version !== SHIFT_STATE_VERSIONS[0];
}

export function upgrade(
  state: SHIFT_STATE[keyof SHIFT_STATE]
): SHIFT_STATE[SHIFT_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "inputMin" in state &&
    "inputMax" in state &&
    "outputMin" in state &&
    "outputMax" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case SHIFT_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. SHIFT state: ${JSON.stringify(
      state
    )}.`
  );
}
