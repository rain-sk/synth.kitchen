import { IModule } from ".";

export interface ISynthKitchen {
  modules: IModule[][];
  clicks: any[];
  ioList: Map<string, any>;
}
