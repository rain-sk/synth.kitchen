import React, { Component } from 'react';

export default class HelpTrigger extends Component {
  render() {
    return (
      <button className="help-trigger" onClick={this.props.callback}>?</button>
    );
  }
}