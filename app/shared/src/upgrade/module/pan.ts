import { PAN_STATE, PAN_STATE_VERSIONS } from "../../types/patch/module";

export function needsUpgrade(state: PAN_STATE[keyof PAN_STATE]) {
  return state.version !== PAN_STATE_VERSIONS[0];
}

export function upgrade(
  state: PAN_STATE[keyof PAN_STATE]
): PAN_STATE[PAN_STATE_VERSIONS[0]] {
  if (!state.version && "pan" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case PAN_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. PAN state: ${JSON.stringify(state)}.`
  );
}
