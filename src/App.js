import React, { Component } from 'react';

import { OperatorBlock, OscBlock, OutputBlock, GainBlock } from './components';
import IoMatrix from './components/io/IoMatrix';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: new AudioContext(),
      matrix: new IoMatrix(),
      canvas: null
    }
  }
  componentDidMount() {
    var canvas = document.querySelector("canvas");
    this.state.matrix.setCanvas(canvas);
    this.setState({
      canvas: canvas
    });
  }
  render() {
    return (
      <div className="app">
        <canvas />
        <OscBlock name="osc" context={this.state.context} matrix={this.state.matrix} />
        <OscBlock name="osc" context={this.state.context} matrix={this.state.matrix} />
        <OscBlock name="osc" context={this.state.context} matrix={this.state.matrix} />
        <GainBlock name="gain" context={this.state.context} matrix={this.state.matrix} />
        <GainBlock name="gain" context={this.state.context} matrix={this.state.matrix} />
        <GainBlock name="gain" context={this.state.context} matrix={this.state.matrix} />
        <OutputBlock name="output" context={this.state.context} matrix={this.state.matrix} />
      </div>
    );
  }
}

export default App;
