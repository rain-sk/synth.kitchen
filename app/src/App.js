import React, { Component } from 'react';

import { OscBlock, OutputBlock, GainBlock, LfoBlock } from './components';
import { IoMatrix } from './components/io';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: new AudioContext(),
      children: []
    }
    this.registerMatrix = this.registerMatrix.bind(this);
  }
  registerMatrix(matrix) {
    let children = [];
    children.push(<OutputBlock name="output" key="out" context={this.state.context} matrix={matrix} />);
    children.push(<GainBlock name="gain1" key="gain1" context={this.state.context} matrix={matrix} />);
    children.push(<GainBlock name="gain2" key="gain2" context={this.state.context} matrix={matrix} />);
    children.push(<GainBlock name="gain3" key="gain3" context={this.state.context} matrix={matrix} />);
    children.push(<OscBlock name="osc1" key="osc1" context={this.state.context} matrix={matrix} />);
    children.push(<OscBlock name="osc2" key="osc2" context={this.state.context} matrix={matrix} />);
    children.push(<OscBlock name="osc3" key="osc3" context={this.state.context} matrix={matrix} />);
    children.push(<LfoBlock name="lfo1" key="lfo1" context={this.state.context} matrix={matrix} />);
    children.push(<LfoBlock name="lfo2" key="lfo2" context={this.state.context} matrix={matrix} />);
    children.push(<LfoBlock name="lfo3" key="lfo3" context={this.state.context} matrix={matrix} />);
    this.setState({
      children: children
    });
  }
  render() {
    return (
      <div className="app">
        <IoMatrix register={this.registerMatrix} />
        {this.state.children}
      </div>
    );
  }
}

export default App;
