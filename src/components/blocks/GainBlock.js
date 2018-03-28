import React, { Component } from 'react';
import { ModBlock}  from '.';
import { IoInput, IoOutput } from '../io';
import { Controls, RangeInput } from '../controls';

export default class GainBlock extends Component {
  constructor(props) {
    super(props);
    let gain = props.context.createGain();
    gain.gain.value = 0.3;
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
      <ModBlock name={this.props.name}>
        <Controls>
          <RangeInput name={'vol'} min={0} max={1} step={0.01} value={this.state.gain.gain.value} callback={this.gainVolumeChange} />
        </Controls>
        <IoInput name={this.props.name + '-input'} property={this.state.gain} matrix={this.state.matrix} />
        <IoOutput name={this.props.name + '-output'} property={this.state.gain} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}