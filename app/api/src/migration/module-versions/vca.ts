import { VCA_STATE, VCA_STATE_VERSIONS } from "synth.kitchen-shared";

export function needsUpgrade(state: VCA_STATE[keyof VCA_STATE]) {
  return state.version !== VCA_STATE_VERSIONS[0];
}

export function upgrade(
  state: VCA_STATE[keyof VCA_STATE]
): VCA_STATE[VCA_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "gate" in state &&
    "attack" in state &&
    "decay" in state &&
    "sustain" in state &&
    "release" in state &&
    "peak" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case VCA_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. VCA state: ${JSON.stringify(state)}.`
  );
}
