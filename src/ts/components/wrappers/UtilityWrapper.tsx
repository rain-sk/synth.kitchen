import * as React from 'react';

export class UtilityWrapper extends React.Component {
  public render() {
    return (
      <div className="kitchen-utility-wrapper">
        {this.props.children}
      </div>
    );
  }
}
