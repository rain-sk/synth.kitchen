import * as React from 'react';

export class KitchenWrapper extends React.Component {
  public render() {
    return (
      <div className="kitchen-wrapper">
        {this.props.children}
      </div>
    );
  }
}
