import React, { Component } from 'react';
import ModBlock from './ModBlock';
import { IoInput, IoOutput, IoMod } from './io';

export default class OscBlock extends Component {
  constructor(props) {
    super(props);
    var osc = props.context.createOscillator();
    osc.start();
    this.state = {
      context: props.context,
      matrix: props.matrix,
      osc: osc
    };
  }
  render() {
    return (
      <ModBlock name={this.props.name}>
        <IoMod property={this.state.osc.frequency} matrix={this.state.matrix} />
        <IoOutput property={this.state.osc} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}