import React, { Component } from 'react';

export default class IoOutput extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onMouseDown(e) {
    this.props.matrix.sourceMouseDown(this.props.property, e.clientX, e.clientY, this.props.name);
  }
  onClick() {
    this.props.matrix.sourceDisconnect(this.props.name, this.props.name);
  }
  render() {
    return (
      <button className="io io-output" onMouseDown={this.onMouseDown} onClick={this.onClick}>-</button>
    );
  }
}