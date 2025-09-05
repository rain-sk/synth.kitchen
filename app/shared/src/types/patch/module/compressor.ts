export type COMPRESSOR_STATE_VERSIONS = ["0.5.0"];
export const COMPRESSOR_STATE_VERSIONS: COMPRESSOR_STATE_VERSIONS = ["0.5.0"];

export type COMPRESSOR_STATE = {
  ["0.5.0"]: {
    version: "0.5.0";
    attack: number;
    release: number;
    knee: number;
    ratio: number;
    threshold: number;
  };
};
