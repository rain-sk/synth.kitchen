import { MODULE_GROUP_STATE, MODULE_GROUP_STATE_VERSIONS } from "../../types/patch/module";

export function needsUpgrade(state: MODULE_GROUP_STATE[keyof MODULE_GROUP_STATE]) {
  return state.version !== MODULE_GROUP_STATE_VERSIONS[0];
}

export function upgrade(
  state: MODULE_GROUP_STATE[keyof MODULE_GROUP_STATE]
): MODULE_GROUP_STATE[MODULE_GROUP_STATE_VERSIONS[0]] {
  if (state.version === MODULE_GROUP_STATE_VERSIONS[0]) {
    return state;
  }

  throw new Error(
    `Unable to upgrade given state object. MODULE_GROUP state: ${JSON.stringify(
      state
    )}.`
  );
}
