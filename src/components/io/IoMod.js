import React, { Component } from 'react';

export default class IoMod extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onClick() {
    this.props.matrix.destinationDisconnect(this.props.property, this.props.name);
  }
  onMouseUp(e) {
    this.props.matrix.destinationMouseUp(this.props.property, e.clientX, e.clientY, this.props.name);
  }
  render() {
    return (
      <button className="io io-mod" onClick={this.onClick} onMouseUp={this.onMouseUp}>~</button>
    )
  }
}