import * as React from 'react';
import { IModule, IModuleState } from '../declarations';
import { context } from '../context';
import { Icon, IOWrapper } from '.';
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
    console.log('new module');
  }
  render() {
    return (
      <article className={`module ${this.props.type.toLocaleLowerCase()}`}>
        <header>
          <Icon type={this.props.type} />
          {this.props.type.toLocaleLowerCase()}
        </header>
        <IOWrapper name="inputs" io={this.state.inputs} dispatch={this.props.dispatch} />
        <IOWrapper name="params" io={this.state.params} dispatch={this.props.dispatch} />
        <IOWrapper name="outputs" io={this.state.outputs} dispatch={this.props.dispatch} />
        <IOWrapper name="mods" io={this.state.mods} dispatch={this.props.dispatch} />
      </article>
    )
  }
}
