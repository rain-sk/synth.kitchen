import React, { Component } from 'react';

import { OperatorBlock, OscBlock, OutputBlock, GainBlock } from './components';
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
    children.push(<OscBlock name="osc1" key="osc1" context={this.state.context} matrix={matrix} />);
    children.push(<OscBlock name="osc2" key="osc2" context={this.state.context} matrix={matrix} />);
    children.push(<OscBlock name="osc3" key="osc3" context={this.state.context} matrix={matrix} />);
    children.push(<GainBlock name="gain1" key="gain1" context={this.state.context} matrix={matrix} />);
    children.push(<GainBlock name="gain2" key="gain2" context={this.state.context} matrix={matrix} />);
    children.push(<GainBlock name="gain3" key="gain3" context={this.state.context} matrix={matrix} />);
    children.push(<OutputBlock name="output" key="out" context={this.state.context} matrix={matrix} />);
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
