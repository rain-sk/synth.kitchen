import React, { Component } from 'react';
import ModBlock from './ModBlock';
import { IoInput, IoOutput } from './io';
import Operator from '../nodes/Operator';

export default class OperatorBlock extends Component {
  constructor(props) {
    super(props);
    let osc = new Operator(props.context);
    osc.start();
    this.state = {
      on: false,
      osc: osc,
      context: props.context
    }
    this.toggle = this.toggle.bind(this);
    this.oscOn = this.oscOn.bind(this);
    this.oscOff = this.oscOff.bind(this);
  }
  toggle() {
    if (this.state.on) {
      this.oscOff();
      this.setState({
        on: false
      });
    }
    else {
      this.oscOn();
      this.setState({
        on: true
      });
    }
  }
  oscOn() {
    this.state.osc.connect(this.state.context.destination);
  }
  oscOff() {
    this.state.osc.disconnect();
  }
  render() {
    return (
      <ModBlock>
        <h1>I have a context</h1>
        <button onClick={this.toggle}>play</button>
      </ModBlock>
    )
  }
}