export type MIDI_TRIGGER_STATE_VERSIONS = ["0.5.0"];
export const MIDI_TRIGGER_STATE_VERSIONS: MIDI_TRIGGER_STATE_VERSIONS = [
  "0.5.0",
];

export type MIDI_TRIGGER_STATE = {
  ["0.5.0"]: {
    version: "0.5.0";
    input: string;
    note: "all" | number;
  };
};
