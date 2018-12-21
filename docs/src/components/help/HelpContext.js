import React, { Component } from 'react';
import { HelpTrigger } from '.';

export default class HelpContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelping: false
    }
    this.helpTrigger = this.helpTrigger.bind(this);
  }
  helpTrigger() {
    console.log("help trigger was clicked");
  }
  render() {
    return (
      <div className="help-context">
        <HelpTrigger callback={this.helpTrigger} />
      </div>
    );
  }
}