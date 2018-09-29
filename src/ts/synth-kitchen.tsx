import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { IModule } from './interfaces/i-module';
import { IAction, ModuleType } from './declarations';

export interface ISynthKitchen {
  modules: IModule[][];
}

export class SynthKitchen extends React.Component<any, ISynthKitchen> {
  constructor(props: any) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    const dispatch = this.dispatch;
    this.state = {
      modules: [
        [{ type: ModuleType.GAIN, dispatch }, { type: ModuleType.OSCILLATOR, dispatch },],
        [{ type: ModuleType.COMPLEX, dispatch }, { type: ModuleType.OSCILLATOR, dispatch },]
      ]
    };
    this.render = () => <Kitchen modules={this.state.modules} dispatch={this.dispatch} />;
  }
  dispatch(action: IAction): void {
    console.log(action);
  }
}




// export class SynthKitchen extends React.PureComponent<any, ISynthKitchen> {
//   constructor(props: any) {
//     super(props);
//     this.addModule = this.addModule.bind(this);
//     this.addRow = this.addRow.bind(this);
//     this.removeModule = this.removeModule.bind(this);
//     this.removeRow = this.removeRow.bind(this);
//     const currentState = [
//       [ModuleType.BIQUAD_FILTER, ModuleType.COMPLEX],
//       [ModuleType.DELAY, ModuleType.IIR_FILTER]
//     ];
//     this.state = { currentState };
//   }
//   addRow() {
//     const current = this.state.currentState;
//     const state = stateMap.get(current);
//     if (!!state) {
//       state.push([]);
//       stateMap.delete(current);
//       const currentState = S8();
//       stateMap.set(currentState, state);
//       this.setState({ currentState });
//     }
//   }
//   removeRow(index: number) {
//     const current = this.state.currentState;
//     const state = stateMap.get(current);
//     if (!!state) {
//       state.splice(index);
//       stateMap.delete(current);
//       const currentState = S8();
//       stateMap.set(currentState, state);
//       this.setState({ currentState });
//     }
//   }
//   addModule(index: number) {
//     const current = this.state.currentState;
//     if (!!state) {
//       state[index].push(S8());
//       stateMap.delete(current);
//       const currentState = S8();
//       stateMap.set(currentState, state);
//       this.setState({ currentState });
//     }
//   }
//   removeModule(rowIndex: number, moduleIndex: number) {
//     const current = this.state.currentState;
//     const state = stateMap.get(current);
//     if (!!state) {
//       state[rowIndex].splice(moduleIndex);
//       stateMap.delete(current);
//       const currentState = S8();
//       stateMap.set(currentState, state);
//       this.setState({ currentState });
//     }
//   }
//   public render() {
//     return;
//   }
// }
