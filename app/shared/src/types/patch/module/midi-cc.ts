export type MIDI_CC_STATE_VERSIONS = ["0.5.9", "0.5.0"];
export const MIDI_CC_STATE_VERSIONS: MIDI_CC_STATE_VERSIONS = [
  "0.5.9",
  "0.5.0",
];

export type MIDI_CC_STATE = {
  ["0.5.9"]: {
    version: "0.5.9";
    input: string;
    cc: number;
    channel: number;
    min: number;
    max: number;
  };
  ["0.5.0"]: {
    version: "0.5.0";
    input: string;
    cc: number;
    min: number;
    max: number;
  };
};
