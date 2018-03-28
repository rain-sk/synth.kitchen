import React, { Component } from 'react';

export default class IoOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guid: S8()
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onMouseDown(e) {
    this.props.matrix.sourceMouseDown(this.props.property, e.clientX, e.clientY, this.state.guid);
  }
  onClick() {
    this.props.matrix.sourceDisconnect(this.state.guid);
  }
  render() {
    return (
      <button className="io io-output" onMouseDown={this.onMouseDown} onClick={this.onClick}>-</button>
    );
  }
}

function S8() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}