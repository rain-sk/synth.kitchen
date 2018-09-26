import * as React from 'react';
import { IAction, IDispatch, IModule, IIO } from '../interfaces';
import { IOType, ModuleType } from '../enums';
import { context } from '../../index';
import { IO } from '.';

interface IModuleState extends IDispatch {
  node?: any;
  inputs?: IIO[];
  outputs?: IIO[];
  mods?: IIO[];
  params?: IIO[];
}

const createGain = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createGain()): IModuleState => {
  return {
    dispatch,
    node,
    inputs: [{
      name: 'input',
      types: [IOType.DESTINATION],
      target: node
    }],
    outputs: [{
      name: 'output',
      types: [IOType.SOURCE],
      target: node
    }],
    mods: [{
      name: 'gain',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'gain'
    }],
    params: []
  }
}

const createOscillator = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createOscillator()): IModuleState => {
  return {
    dispatch,
    node,
    inputs: [],
    outputs: [{
      name: 'output',
      types: [IOType.SOURCE],
      target: node
    }],
    mods: [{
      name: 'frequency',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'frequency'
    }, {
      name: 'detune',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'detune'
    }],
    params: [{
      name: 'type',
      types: [IOType.A_RATE, IOType.PARAM],
      target: node,
      accessor: 'type'
    }]
  }
}

export class Module extends React.Component<IModule, IModuleState> {
  constructor(props: IModule) {
    super(props);
    let state = (props.type === ModuleType.GAIN)
      ? createGain(props.dispatch, context)
      : (props.type === ModuleType.OSCILLATOR)
        ? createOscillator(props.dispatch, context)
        : null;

    if (!!state) {
      this.state = {
        ...state
      };
    }
    console.log(this);
  }
  render() {
    return (
      <article
        //id={`module_${props.mod.type}`}
        className={`module key_${this.props.type} index_${this.props.index}`}>
        {
          this.state && this.state.params ? this.state.params.map(param => <IO {...param} />) : null
        }
        {
          this.state && this.state.inputs ? this.state.inputs.map(input => <IO {...input} />) : null
        }
        {
          this.state && this.state.mods ? this.state.mods.map(mod => <IO {...mod} />) : null
        }
        {
          this.state && this.state.outputs ? this.state.outputs.map(output => <IO {...output} />) : null
        }
      </article>
    )
  }
}
