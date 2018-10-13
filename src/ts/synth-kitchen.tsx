import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { IAction, ISynthKitchen, ModuleType, IOContext, IContract, MapNode, IOContract, IIOConnection } from './declarations';
import { IO_CLICK, IO_REGISTER } from './reducers';

const reducers = new Map<string, IContract>([
  [IO_CLICK.type, IO_CLICK],
  [IO_REGISTER.type, IO_REGISTER]
]);

const reduce = (action: any, store: ISynthKitchen) => {
  reducers.forEach(reducer => {
    store = (action.type === reducer.type) ? reducer.reduce(action, store) : store;
  });
  return store;
}

export class SynthKitchen extends React.Component<any, ISynthKitchen> {
  constructor(props: any) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    const dispatch = this.dispatch;
    const modules = [
      [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }],
      [{ type: ModuleType.REVERB, dispatch }, { type: ModuleType.PANNER, dispatch }, { type: ModuleType.BIQUAD_FILTER, dispatch }],
      // [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }, { type: ModuleType.DELAY, dispatch }],
      // [{ type: ModuleType.COMPLEX, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }]
    ];
    const ioContext: IOContext = [false, undefined, undefined];
    const ioNodes = new Map<string, MapNode>();
    const ioConnections = new Map<string, IIOConnection>();
    this.state = { modules, ioContext, ioNodes, ioConnections };
  }
  dispatch(action: IAction<{}>): void {
    const state = reduce(action, this.state);
    this.setState({ ...state }, () => { action.type !== IOContract.REGISTER ? console.table([this.state]) : null; });
  }
  render() {
    return (
      <Context.Provider value={this.state.ioContext}>
        <Kitchen modules={this.state.modules} dispatch={this.dispatch} />
      </Context.Provider>
    );
  }
}

const Context = React.createContext<IOContext>([false, undefined, undefined]);

export const IOConsumer = Context.Consumer;
