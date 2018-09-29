export const guid = () => {
  // tslint:disable-next-line:no-bitwise
  return `${seg()}${seg()}-${seg()}-${seg()}-${seg()}-${seg()}${seg()}${seg()}`;
};

const seg = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};