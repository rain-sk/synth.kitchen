import { IModule } from ".";
import { IOContext, MapNode } from "..";
import { IIOConnection } from "..";

export interface ISynthKitchen {
  modules: IModule[][];
  ioContext: IOContext;
  ioNodes: Map<string, MapNode>;
  ioConnections: Map<string, IIOConnection>;
}
