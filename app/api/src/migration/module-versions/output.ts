import { OUTPUT_STATE, OUTPUT_STATE_VERSIONS } from "synth.kitchen-shared";

export function needsUpgrade(state: OUTPUT_STATE[keyof OUTPUT_STATE]) {
  return state.version !== OUTPUT_STATE_VERSIONS[0];
}

export function upgrade(
  state: OUTPUT_STATE[keyof OUTPUT_STATE]
): OUTPUT_STATE[OUTPUT_STATE_VERSIONS[0]] {
  if (!state.version && "gain" in state) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
    case OUTPUT_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. OUTPUT state: ${JSON.stringify(
      state
    )}.`
  );
}
