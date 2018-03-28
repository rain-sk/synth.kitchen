import React, { Component } from 'react';
import { IoInput } from './io';

export default class OutputBlock extends Component {
  constructor(props) {
    super(props);
    var gain = props.context.createGain();
    gain.connect(props.context.destination);
    gain.gain.value = .5;
    this.state = {
      context: props.context,
      matrix: props.matrix,
      gain: gain
    }
    this.gainVolumeChange = this.gainVolumeChange.bind(this);
  }
  gainVolumeChange(e) {
    let gain = this.state.gain;
    gain.gain.value = e.target.value;
    this.setState({
      gain: gain
    });
  }
  render() {
    return (
      <div className="output">
        <IoInput name={this.props.name + "-input"} property={this.state.gain} matrix={this.state.matrix} />
      </div>
    )
  }
}