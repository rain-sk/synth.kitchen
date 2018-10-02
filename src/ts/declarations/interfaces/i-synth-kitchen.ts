import { IModule } from ".";
import { IOType } from "..";

export interface ISynthKitchen {
  modules: IModule[][];
  clicks: any[];
  ioContext: [string | undefined, IOType | undefined, boolean];
  ioList: Map<string, any>;
}
