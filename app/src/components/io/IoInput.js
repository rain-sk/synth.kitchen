import React, { Component } from 'react';

export default class IoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guid: S8()
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onClick() {
    this.props.matrix.destinationDisconnect(this.state.guid);
  }
  onMouseUp(e) {
    this.props.matrix.destinationMouseUp(this.props.property, e.clientX, e.clientY, this.state.guid);
  }
  render() {
    return (
      <button className="io io-input" onClick={this.onClick} onMouseUp={this.onMouseUp}>+</button>
    )
  }
}

function S8() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}