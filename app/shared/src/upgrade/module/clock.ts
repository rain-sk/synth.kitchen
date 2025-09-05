import { CLOCK_STATE, CLOCK_STATE_VERSIONS } from "../../types/patch/module";

export function needsUpgrade(state: CLOCK_STATE[keyof CLOCK_STATE]) {
  return state.version !== CLOCK_STATE_VERSIONS[0];
}

export function upgrade(
  state: CLOCK_STATE[keyof CLOCK_STATE]
): CLOCK_STATE[CLOCK_STATE_VERSIONS[0]] {
  if (!state.version && "tempo" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  // TODO: implement clock mode
  // if (state.version === "0.5.0") {
  //   state = {
  //     ...state,
  //     version: "0.6.0",
  //     mode: "4",
  //   };
  // }

  if (state.version === CLOCK_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. CLOCK state: ${JSON.stringify(
      state
    )}.`
  );
}
