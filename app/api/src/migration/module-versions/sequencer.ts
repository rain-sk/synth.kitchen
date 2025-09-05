import {
  SEQUENCER_STATE,
  SEQUENCER_STATE_VERSIONS,
} from "synth.kitchen-shared";

export function needsUpgrade(state: SEQUENCER_STATE[keyof SEQUENCER_STATE]) {
  return state.version !== SEQUENCER_STATE_VERSIONS[0];
}

export function upgrade(
  state: SEQUENCER_STATE[keyof SEQUENCER_STATE]
): SEQUENCER_STATE[SEQUENCER_STATE_VERSIONS[0]] {
  if (
    !state.version &&
    "steps" in state &&
    "step0" in state &&
    "step1" in state &&
    "step2" in state &&
    "step3" in state &&
    "step4" in state &&
    "step5" in state &&
    "step6" in state &&
    "step7" in state
  ) {
    state = {
      ...(state as any),
      version: "0.5.0",
    };
  }

  switch (state.version) {
    case "0.5.0":
      state = {
        ...state,
        version: "0.5.1",
        step8: 0,
        step9: 0,
        step10: 0,
        step11: 0,
        step12: 0,
        step13: 0,
        step14: 0,
        step15: 0,
      };
    case "0.5.1":
    case SEQUENCER_STATE_VERSIONS[0]:
      return state;
  }

  throw new Error(
    `Unable to upgrade given state object. SEQUENCER state: ${JSON.stringify(
      state
    )}.`
  );
}
