import * as React from 'react';

import { createContext } from './flux/createContext';

export interface ISynthKitchenProps {
  id?: number;
}
export interface ISynthKitchenState {
  id: number;
  loading: boolean;
  name: string;
  modules: string[];
  connections: string[];
}

export interface Action {
  //type: Actions,
  payload?: any
}

export const context = createContext();

export class SynthKitchen extends React.Component<ISynthKitchenProps, ISynthKitchenState> {
  /** app startup */
  constructor(props: ISynthKitchenProps) {
    super(props);
    this.init(props.id);
  }
  private init(id?: number) {
    if (id !== undefined) {
      this.state = {
        id: id,
        loading: true,
        name: '',
        modules: [],
        connections: []
      };
      this.initFromStorage(id);
    } else {
      this.state = {
        id: -1,
        loading: false,
        name: 'Clean Kitchen',
        modules: [],
        connections: []
      };
    }
  }
  private initFromStorage(id: number) {
    console.log(`loading configuration with ID: ${id}`);
  }
  public render() {
    return this.state.loading ?
      (
        <h1>loading...</h1>
      ) :
      (
        null
      );
  }
}
