export type CLOCK_STATE_VERSIONS = [
  //"0.6.0",
  "0.5.0"
];
export const CLOCK_STATE_VERSIONS: CLOCK_STATE_VERSIONS = [
  //"0.6.0",
  "0.5.0",
];

export type CLOCK_STATE = {
  // ["0.6.0"]: {
  //   version: "0.6.0";
  //   tempo: number;
  //   mode: "32" | "24" | "16" | "12" | "8" | "6" | "4" | "3" | "2" | "1";
  // };
  ["0.5.0"]: {
    version: "0.5.0";
    tempo: number;
  };
};
