export const guid = () => {
  return `${h()}${h()}-${h()}-${h()}-${h()}-${h()}${h()}${h()}`;
};

const h = () => {
  // tslint:disable-next-line:no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};