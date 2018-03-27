import React, { Component } from 'react';
import ModBlock from './ModBlock';
import { IoInput, IoOutput } from './io';

export default class OutputBlock extends Component {
  constructor(props) {
    super(props);
    var gain = props.context.createGain();
    gain.connect(props.context.destination);
    gain.gain.value = .02;
    this.state = {
      context: props.context,
      matrix: props.matrix,
      gain: gain
    }
  }
  render() {
    return (
      <ModBlock name={this.props.name}>
        <IoInput name={this.props.name + "-input"} property={this.state.gain} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}