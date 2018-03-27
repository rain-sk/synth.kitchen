import React, { Component } from 'react';
import ModBlock from './ModBlock';
import { IoInput, IoOutput } from './io';

export default class OutputBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: props.context,
      matrix: props.matrix
    }
  }
  render() {
    return (
      <ModBlock name={this.props.name}>
        <IoInput property={this.state.context.destination} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}