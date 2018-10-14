import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { IAction, ISynthKitchen, ModuleType, IOContext, IContract, MapNode, IOContract, IIOConnection } from './declarations';
import { CONNECTION_CONNECT, CONNECTION_DISCONNECT, IO_CONNECT, IO_REGISTER, IO_TRIGGER } from './reducers';

const reducers = new Map<string, IContract>([
  [CONNECTION_CONNECT.type, CONNECTION_CONNECT],
  [CONNECTION_DISCONNECT.type, CONNECTION_DISCONNECT],
  [IO_CONNECT.type, IO_CONNECT],
  [IO_REGISTER.type, IO_REGISTER],
  [IO_TRIGGER.type, IO_TRIGGER]
]);

const reduce = (action: IAction<{}>, store: ISynthKitchen) => {
  reducers.forEach(reducer => {
    if (action.type === reducer.type) {
      store = reducer.reduce(action, store);
    }
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
    const dispatchLoop = new Array<IAction<{}>>();
    this.state = { modules, ioContext, ioNodes, ioConnections, dispatchLoop };
  }
  dispatch(action: IAction<{}>): void {
    const state = reduce(action, this.state);
    this.setState({ ...state }, () => {
      action.type !== IOContract.REGISTER ? console.table(this.state.ioContext) : null;
      const newAction = this.state.dispatchLoop.pop();
      if (!!newAction) {
        console.log(newAction)
        this.dispatch(newAction);
      }
    });
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
