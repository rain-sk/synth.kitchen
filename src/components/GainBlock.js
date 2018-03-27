import React, { Component } from 'react';
import ModBlock from './ModBlock';
import { IoInput, IoOutput } from './io';

export default class GainBlock extends Component {
  constructor(props) {
    super(props);
    let gain = props.context.createGain();
    this.state = {
      context: props.context,
      matrix: props.matrix,
      gain: gain
    }
  }
  render() {
    return (
      <ModBlock name={this.props.name}>
        <IoInput property={this.state.gain} matrix={this.state.matrix} />
        <IoOutput property={this.state.gain} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}