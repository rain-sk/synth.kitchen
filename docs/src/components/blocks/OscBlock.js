import React, { Component } from 'react';
import { ModBlock } from '.';
import { IoOutput, IoMod } from '../io';
import { Controls, RangeInput, SelectInput } from '../controls';

export default class OscBlock extends Component {
  constructor(props) {
    super(props);
    var osc = props.context.createOscillator();
    osc.start();
    this.state = {
      context: props.context,
      matrix: props.matrix,
      osc: osc,
      freq: osc.frequency.value
    };
    this.oscFrequencyChange = this.oscFrequencyChange.bind(this);
    this.oscTypeChange = this.oscTypeChange.bind(this);
  }
  oscFrequencyChange(e) {
    let osc = this.state.osc;
    osc.frequency.value = this.logSlider(e.target.value);
    this.setState({
      osc: osc
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
    var minv = Math.log(20);
    var maxv = Math.log(20000);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (position - minp));
  }
  logposition(value) {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;

    // The result should be between 100 an 10000000
    var minv = Math.log(20);
    var maxv = Math.log(20000);

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
        <Controls>
          <RangeInput name={'freq'} min={0} max={100} step={0.1} value={this.logposition(this.state.osc.frequency.value)} callback={this.oscFrequencyChange} />
          <SelectInput name={'wave'} options={waveforms} callback={this.oscTypeChange} />
        </Controls>
        <IoMod name={this.props.name + "-input"} property={this.state.osc.frequency} matrix={this.state.matrix} />
        <IoOutput name={this.props.name + "-output"} property={this.state.osc} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}