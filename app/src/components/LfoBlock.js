import React, { Component } from 'react';
import ModBlock from './ModBlock';
import { IoOutput, IoMod } from './io';

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
    var maxp = 200;

    // The result should be between 100 an 10000000
    var minv = Math.log(0.01);
    var maxv = Math.log(50);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (position - minp));
  }
  logposition(value) {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 200;

    // The result should be between 100 an 10000000
    var minv = Math.log(0.01);
    var maxv = Math.log(50);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return (Math.log(value) - minv) / scale + minp;
  }
  render() {
    return (
      <ModBlock name={this.props.name}>
        <IoMod name={this.props.name + "-input"} property={this.state.osc.frequency} matrix={this.state.matrix} />
        <span className="control">
          <label>
            freq:
            <input type="range" min={0} max={200} step={0.1} value={this.logposition(this.state.osc.frequency.value)} onChange={this.oscFrequencyChange} />
          </label>
          <label>
            mod:
            <input type="range" min={0} max={1000} step={0.1} value={this.state.gain.gain.value} onChange={this.modValueChange} />
          </label>
          <label>
            wave:
            <select onChange={this.oscTypeChange}>
              <option value="sine">sin</option>
              <option value="square">sqr</option>
              <option value="triangle">tri</option>
              <option value="sawtooth">saw</option>
            </select>
          </label>
        </span>
        <IoOutput name={this.props.name + "-output"} property={this.state.gain} matrix={this.state.matrix} />
      </ModBlock>
    )
  }
}