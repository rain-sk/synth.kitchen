export type VCA_STATE_VERSIONS = ["0.5.5", "0.5.4", "0.5.0"];
export const VCA_STATE_VERSIONS: VCA_STATE_VERSIONS = [
  "0.5.5",
  "0.5.4",
  "0.5.0",
];

export type VCA_STATE = {
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
