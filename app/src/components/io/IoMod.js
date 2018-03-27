import React, { Component } from 'react';

export default class IoMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guid: S4()
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
      <button className="io io-mod" onClick={this.onClick} onMouseUp={this.onMouseUp}>~</button>
    )
  }
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}