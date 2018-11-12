import * as React from 'react';

import { IAction, ISynthKitchen, ModuleType, IOContext, IContract, MapNode, IIOConnection } from './declarations';
import { CONNECTION_CONNECT, CONNECTION_DISCONNECT, IO_CONNECT, IO_REGISTER, IO_TRIGGER } from './reducers';
import { ConnectionMap, Kitchen } from './components';
import { IMapConnection } from './components/connection-map';

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
const ioContext: IOContext = [false, undefined, undefined];
const ioNodes = new Map<string, MapNode>();
const ioConnections = new Map<string, IIOConnection>();
const dispatchLoop = new Array<IAction<{}>>();
const initialState = {
  ioContext,
  ioNodes,
  ioConnections,
  dispatchLoop
}

export class SynthKitchen extends React.Component<any, ISynthKitchen> {
  constructor(props: any) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    const dispatch = this.dispatch;
    const modules = [
      [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }],
      [{ type: ModuleType.REVERB, dispatch }, { type: ModuleType.PANNER, dispatch }, { type: ModuleType.BIQUAD_FILTER, dispatch }],
    ];
    this.state = { modules, ...initialState };
  }
  dispatch(action?: IAction<{}>, state?: ISynthKitchen): void {
    if (!!action) {
      const updatedState = reduce(action, !!state ? state : this.state);
      if (updatedState.dispatchLoop.length) {
        return this.dispatch(updatedState.dispatchLoop.pop(), updatedState);
      } else {
        this.setState({ ...updatedState }, () => {
          if (this.state.dispatchLoop.length) this.dispatch(this.state.dispatchLoop.pop());
        });
      }
    }
  }
  render() {
    let connections: IMapConnection[] = [];
    [...this.state.ioConnections.values()].map(connection => {
      const src = this.state.ioNodes.get(connection.sourceId);
      const dst = this.state.ioNodes.get(connection.destinationId);
      if (!!src && !!dst) {
        console.log(src);
        // console.log(src[0]);
        // console.log(dst[0]);
        connections.push({
          destination: dst[0].getPosition(),
          source: src[0].getPosition()
        });
      }
    });
    return (
      <Context.Provider value={this.state.ioContext}>
        <Kitchen modules={this.state.modules} dispatch={this.dispatch} />
        <ConnectionMap context={this.state.ioContext} connections={connections} />
      </Context.Provider>
    );
  }
}

const Context = React.createContext<IOContext>(ioContext);

export const IOConsumer = Context.Consumer;
