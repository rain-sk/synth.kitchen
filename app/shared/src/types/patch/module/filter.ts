import { TBiquadFilterType } from "standardized-audio-context";

export type FILTER_STATE_VERSIONS = ["0.5.11", "0.5.0"];
export const FILTER_STATE_VERSIONS: FILTER_STATE_VERSIONS = ["0.5.11", "0.5.0"];

export type FILTER_STATE = {
  ["0.5.11"]: {
    version: "0.5.11";
    frequency: number;
    transpose: number;
    detune: number;
    Q: number;
    gain: number;
    type:
      | "allpass"
      | "bandpass"
      | "highpass"
      | "highshelf"
      | "lowpass"
      | "lowshelf"
      | "notch"
      | "peaking";
  };
  ["0.5.0"]: {
    version: "0.5.0";
    frequency: number;
    detune: number;
    Q: number;
    gain: number;
    type:
      | "allpass"
      | "bandpass"
      | "highpass"
      | "highshelf"
      | "lowpass"
      | "lowshelf"
      | "notch"
      | "peaking";
  };
};
