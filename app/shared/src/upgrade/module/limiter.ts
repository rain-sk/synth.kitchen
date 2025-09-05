import {
  LIMITER_STATE,
  LIMITER_STATE_VERSIONS,
} from "../../types/patch/module";

export function needsUpgrade(state: LIMITER_STATE[keyof LIMITER_STATE]) {
  return state.version !== LIMITER_STATE_VERSIONS[0];
}

export function upgrade(
  state: LIMITER_STATE[keyof LIMITER_STATE]
): LIMITER_STATE[LIMITER_STATE_VERSIONS[0]] {
  if (!state.version) {
    state = {
      ...((state as any) ?? { input: "", note: "all" }),
      version: "0.5.0",
    };
  }

  if (state.version === LIMITER_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. LIMITER state: ${JSON.stringify(
      state
    )}.`
  );
}
