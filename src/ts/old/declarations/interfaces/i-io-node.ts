import { IIO } from "../../factories/i-io";

export interface IIONode {
  id: string;
  io: IIO;
  getPosition: () => [number, number];
}
