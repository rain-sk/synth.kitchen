import React, { Component } from 'react';

export default class Controls extends Component {
  render() {
    return (
      <span className="control">
        {this.props.children}
      </span>
    );
  }
}