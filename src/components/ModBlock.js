import React, { Component } from 'react';

export default class ModBlock extends Component {
  render() {
    return (
      <div className="mod-block-wrapper">
        <div className="mod-block">
          <span className="mod-block-label">{this.props.name}</span>
          {this.props.children}
        </div>
      </div>
    )
  }
}