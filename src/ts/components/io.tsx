import * as React from 'react';
import { IIO, IOContract } from '../declarations';
import { guid } from '../guid';

export interface IOState {
  hash: string;
  element: React.Ref<HTMLButtonElement>;
}

export class IO extends React.Component<IIO, IOState> {
  ioRef: React.Ref<HTMLButtonElement> = React.createRef();
  constructor(props: IIO) {
    super(props);
    this.state = { hash: guid(), element: this.ioRef };
    props.dispatch({
      type: IOContract.REGISTER,
      payload: {
        ...this.state
      }
    });
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.dispatch({
      type: IOContract.CLICK,
      payload: {
        hash: this.state.hash
      }
    });
  }
  render() {
    return <button type="button" onClick={this.onClick} ref={this.ioRef}>{this.props.name}</button>;
  }
}