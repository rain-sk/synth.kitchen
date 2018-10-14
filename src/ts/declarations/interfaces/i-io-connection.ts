import { IIONode } from ".";

export interface IIOConnection {
  id?: string;
  source: IIONode;
  destination: IIONode;
}