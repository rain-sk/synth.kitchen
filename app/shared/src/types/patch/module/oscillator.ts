export type OSCILLATOR_STATE_VERSIONS = ["0.5.12", "0.5.11", "0.5.2", "0.5.0"];
export const OSCILLATOR_STATE_VERSIONS: OSCILLATOR_STATE_VERSIONS = [
  "0.5.12",
  "0.5.11",
  "0.5.2",
  "0.5.0",
];

export type OSCILLATOR_STATE = {
  ["0.5.12"]: {
    version: "0.5.12";
    transpose: number;
    frequency: number;
    detune: number;
    level: number;
    waveform: "sine" | "triangle" | "square" | "sawtooth";
  };
  ["0.5.11"]: {
    version: "0.5.11";
    transpose: number;
    frequency: number;
    detune: number;
    peak: number;
    waveform: "sine" | "triangle" | "square" | "sawtooth";
  };
  ["0.5.2"]: {
    version: "0.5.2";
    transpose: number;
    frequency: number;
    detune: number;
    waveform: "sine" | "triangle" | "square" | "sawtooth";
  };
  ["0.5.0"]: {
    version: "0.5.0";
    frequency: number;
    detune: number;
    waveform: "sine" | "triangle" | "square" | "sawtooth";
  };
};
