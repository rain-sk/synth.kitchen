import React, { Component } from 'react';

export default class IoOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: props.property,
      matrix: props.matrix,
      clicked: false
    }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onMouseDown() {
    this.state.matrix.sourceMouseDown(this.state.property);
  }
  onMouseUp() {
    if (this.state.button)
      this.state.matrix.sourceDisconnect(this.state.property);
  }
  render() {
    return (
      <button className="io io-output" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>-</button>
    );
  }
}