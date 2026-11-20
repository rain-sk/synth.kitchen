
export const splitCents = (
  detune: number,
): { transpose: number; detune: number } => {
  const sign = detune >= 0 ? 1 : -1;
  const abs = Math.abs(detune);

  if (abs > 100) {
    return {
      transpose: sign * Math.floor(abs / 100) + 0,
      detune: sign * (abs % 100) + 0,
    };
  }

  return { transpose: 0, detune };
};
