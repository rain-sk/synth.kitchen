import React, { Component } from 'react';

export default class IoInput extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onClick(e) {
    this.props.matrix.destinationDisconnect(this.props.property, this.props.name);
  }
  onMouseUp(e) {
    this.props.matrix.destinationMouseUp(this.props.property, e.clientX, e.clientY, this.props.name);
  }
  render() {
    return (
      <button className="io io-input" onClick={this.onClick} onMouseUp={this.onMouseUp}>+</button>
    )
  }
}