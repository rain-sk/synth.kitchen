export type ENVELOPE_STATE_VERSIONS = ["0.5.5", "0.5.4", "0.5.0"];
export const ENVELOPE_STATE_VERSIONS: ENVELOPE_STATE_VERSIONS = [
  "0.5.5",
  "0.5.4",
  "0.5.0",
];

export type ENVELOPE_STATE = {
  ["0.5.5"]: {
    version: "0.5.5";
    gate: number;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    peak: number;
  };
  ["0.5.4"]: {
    version: "0.5.4";
    hold: number;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    peak: number;
  };
  ["0.5.0"]: {
    version: "0.5.0";
    gate: number;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    peak: number;
  };
};
