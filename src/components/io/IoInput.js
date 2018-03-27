import React, { Component } from 'react';

export default class IoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: props.property,
      matrix: props.matrix
    }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onMouseDown() {
    this.state.matrix.sourceMouseDown(this.state.property);
  }
  onMouseUp() {
    this.props.matrix.destinationMouseUp(this.state.property);
  }
  render() {
    return (
      <button className="io io-input" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>+</button>
    )
  }
}