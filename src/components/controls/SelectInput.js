import React, { Component } from 'react';

export default class SelectInput extends Component {
  render() {
    let options = [];
    this.props.options.forEach((option,index) => {
      options.push(<option key={index} value={option.value}>{option.name}</option>)
    });
    return (
      <label>
        {this.props.name}:
        <select onChange={this.props.callback}>
          {options}
        </select>
      </label>
    );
  }
}