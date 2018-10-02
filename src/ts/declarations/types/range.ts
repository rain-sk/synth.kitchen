export type Range = [
  number,
  number,
  (controlSetting: number) => number,
  (nodeValue: number) => number
];