import * as React from 'react';
import { KitchenWrapper, NavWrapper, UtilityWrapper } from './components/wrappers';
import { RackCollection } from './components/collections';
import { IRackCollection, RackActions } from './components/collections/RackCollection';
import { ModuleActions } from './components/collections/ModuleCollection';

export interface ISynthKitchenProps {
  id?: number;
}

export interface ISynthKitchenState {
  history: ISynthKitchenState[];
  id: number;
  loading: boolean;
  name: string;
  racks: any[][];
  modules: Map<string, any>;
}

export type Actions = RackActions | ModuleActions;

export interface Action {
  type: Actions,
  payload?: any
}

export class SynthKitchen extends React.Component<ISynthKitchenProps, ISynthKitchenState> {
  /** app startup */
  constructor(props: any) {
    super(props);
    this.init(props.id);
  }
  private init(id?: number) {
    if (!!id) {
      this.state = {
        id: id,
        loading: true,
        name: '',
        racks: [],
        modules: new Map<string, any>(),
        history: []
      };
      this.initFromStorage(id);
    } else {
      this.state = {
        id: -1,
        loading: false,
        name: 'New Kitchen',
        racks: [
          [1, 4, 2, 5]
        ],
        modules: new Map<string, any>(),
        history: []
      };
    }
  }
  private initFromStorage(id: number) {
    console.log(`loading configuration with ID: ${id}`);
  }
  /** /app startup */

  /** app state */
  private config(): IRackCollection {
    return {
      racks: this.state.racks,
      reduce: this.reduce.bind(this)
    };
  };

  /** reducers */
  private addRack(): void {
    const racks = this.state.racks;
    racks.push([]);
    this.setState({ racks });
  }
  private addModule(rackIndex: number) {
    const racks = this.state.racks;
    if (!!racks[rackIndex]) {
      racks[rackIndex].push(0);
    }
    this.setState({ racks });
  }
  private registerModule(hash: string, rackIndex: number, moduleIndex: number) {
    const modules = this.state.modules.set(hash, this.state.racks[rackIndex][moduleIndex]);
    this.setState({ modules });
  }
  private reduce(action: Action) {
    console.log(action);
    if (action.type === RackActions.AddRack) {
      this.addRack();
    } else if (action.type === RackActions.RemoveRack) {
      console.log(`remove rack ${action.payload}`);
    } else if (action.type === ModuleActions.AddModule) {
      this.addModule(action.payload + 0);
    } else if (action.type === ModuleActions.RemoveModule) {
      console.log(`remove module ${action.payload}`);
    } else if (action.type === ModuleActions.RegisterModule) {
      this.registerModule(
        action.payload.hash,
        action.payload.rackIndex,
        action.payload.moduleIndex
      );
    }
  }

  public render() {
    const config = this.config();
    return this.state.loading ?
      (
        <h1>loading...</h1>
      ) :
      (
        <KitchenWrapper>
          <NavWrapper />
          <UtilityWrapper />
          <RackCollection {...config} />
        </KitchenWrapper>
      );
  }
}
