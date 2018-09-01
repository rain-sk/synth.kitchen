import * as React from 'react';

export class NavWrapper extends React.Component {
  public render() {
    return (
      <div className="kitchen-nav-wrapper">
        {this.props.children}
      </div>
    );
  }
}
