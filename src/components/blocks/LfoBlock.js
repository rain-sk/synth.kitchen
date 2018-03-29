import React, { Component } from 'react';
import { ModBlock } from '.';
import { IoOutput, IoMod } from '../io';
import { Controls, RangeInput, SelectInput } from '../controls';

export default class LfoBlock extends Component {
  constructor(props) {
    super(props);
    var osc = props.context.createOscillator();
    var gain = props.context.createGain();
    osc.frequency.value = 1;
    osc.start();
    osc.connect(gain);
    gain.gain.value = 100;
    this.state = {
      context: props.context,
      matrix: props.matrix,
      osc: osc,
      gain: gain
    };
    this.oscFrequencyChange = this.oscFrequencyChange.bind(this);
    this.modValueChange = this.modValueChange.bind(this);
    this.oscTypeChange = this.oscTypeChange.bind(this);
  }
  oscFrequencyChange(e) {
    let osc = this.state.osc;
    osc.frequency.value = this.logSlider(e.target.value);
    this.setState({
      osc: osc
    });
  }
  modValueChange(e) {
    let gain = this.state.gain;
    gain.gain.value = e.target.value;
    this.setState({
      gain: gain
    });
  }
  oscTypeChange(e) {
    let osc = this.state.osc;
    osc.type = e.target.value;
    this.setState({
      osc: osc
    });
  }
  logSlider(position) {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;

    // The result should be between 100 an 10000000
    var minv = Math.log(0.01);
    var maxv = Math.log(1000);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (position - minp));
  }
  logposition(value) {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;

    var minv = Math.log(0.01);
    var maxv = Math.log(1000);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return (Math.log(value) - minv) / scale + minp;
  }
  render() {
    let waveforms = [
      { value: "sine", name: "sin" },
      { value: "triangle", name: "tri" },
      { value: "square", name: "sqr" },
      { value: "sawtooth", name: "saw" }
    ];
    return (
      <ModBlock name={this.props.name}>
        <IoMod name={this.props.name + "-input"} property={this.state.osc.frequency} matrix={this.state.matrix} />
        <Controls>
          <RangeInput name={'freq'} min={0.01} max={100} step={0.01} value={this.logposition(this.state.osc.frequency.value)} callback={this.oscFrequencyChange} />
          <RangeInput name={'mod'} min={1} max={200} step={0.1} value={this.state.gain.gain.value} callback={this.modValueChange} />
          <SelectInput name={'wave'} options={waveforms} callback={this.oscTypeChange} />
        </Controls>
        <IoOutput name={this.props.name + "-output"} property={this.state.gain} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}