import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { IAction, ISynthKitchen, ModuleType } from './declarations';
import { reduce } from './reduce';

export class SynthKitchen extends React.Component<any, ISynthKitchen> {
  constructor(props: any) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    const dispatch = this.dispatch;
    const modules = [
      [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }, { type: ModuleType.DELAY, dispatch }],
      [{ type: ModuleType.COMPLEX, dispatch }, { type: ModuleType.OSCILLATOR, dispatch }]
    ];
    const clicks: any[] = [];
    const ioList = new Map<string, any>();
    this.state = { modules, clicks, ioList };
  }
  render() {
    return <Kitchen modules={this.state.modules} dispatch={this.dispatch} />;
  }
  dispatch(action: IAction): void {
    console.log(action);
    const state = reduce(action, this.state);
    this.setState({ ...state });
  }
}
