import React, { Component } from 'react';

export default class RangeInput extends Component {
  render() {
    return (
      <label>
        {this.props.name}:
        <input
          type="range"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step ? this.props.step : .1}
          value={this.props.value}
          onChange={this.props.callback} />
      </label>
    );
  }
}