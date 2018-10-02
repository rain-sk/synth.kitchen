import * as React from 'react';
import { IModule, IModuleState } from '../declarations';
import { context } from '../context';
import { ParamWrapper, InputWrapper, ModWrapper, OutputWrapper } from '.';
import { createModuleState } from '../factories';


export class Module extends React.Component<IModule, IModuleState> {
  constructor(props: IModule) {
    super(props);
    let state = createModuleState(props.type, props.dispatch, context);
    if ('node' in state) {
      this.state = {
        ...state
      };
    } else {
      this.state = {
        node: null,
        inputs: [],
        outputs: [],
        mods: [],
        params: []
      };
    }
  }
  render() {
    return (
      <article className={`module ${this.props.type.toLocaleLowerCase()}`}>
        <ParamWrapper params={this.state.params} dispatch={this.props.dispatch} />
        <InputWrapper inputs={this.state.inputs} dispatch={this.props.dispatch} />
        <ModWrapper mods={this.state.mods} dispatch={this.props.dispatch} />
        <OutputWrapper outputs={this.state.outputs} dispatch={this.props.dispatch} />
      </article>
    )
  }
}
