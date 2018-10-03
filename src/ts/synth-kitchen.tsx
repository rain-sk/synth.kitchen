import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { IAction, ISynthKitchen, ModuleType, IOType, IOContext, IContract } from './declarations';
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

const IO = React.createContext<IOContext>([undefined, undefined, false]);

export class SynthKitchen extends React.Component<any, ISynthKitchen> {
  constructor(props: any) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    const dispatch = this.dispatch;
    const modules = [
      [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }, { type: ModuleType.DELAY, dispatch }],
      [{ type: ModuleType.REVERB, dispatch }, { type: ModuleType.PANNER, dispatch }, { type: ModuleType.BIQUAD_FILTER, dispatch }],
      [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }, { type: ModuleType.DELAY, dispatch }],
      [{ type: ModuleType.COMPLEX, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }]
    ];
    const clicks: any[] = [];
    const ioContext: [string | undefined, IOType | undefined, boolean] = [undefined, undefined, false];
    const ioList = new Map<string, any>();
    this.state = { modules, clicks, ioContext, ioList };
  }
  render() {
    return (
      <IO.Provider value={this.state.ioContext}>
        <Kitchen modules={this.state.modules} dispatch={this.dispatch} />
      </IO.Provider>
    );
  }
  dispatch(action: IAction): void {
    console.log(action);
    const state = reduce(action, this.state);
    this.setState({ ...state });
  }
}

export const IOConsumer = IO.Consumer;
