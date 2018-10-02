import * as React from 'react';
import { IIO, IOContract, IOType } from '../declarations';
import { guid } from '../guid';

export interface IOState {
  id: string;
  element: React.Ref<HTMLButtonElement>;
}

export class IO extends React.Component<IIO, IOState> {
  ioRef: React.Ref<HTMLButtonElement> = React.createRef();
  constructor(props: IIO) {
    super(props);
    this.state = { id: guid(), element: this.ioRef };
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
        ...this.state
      }
    });
  }
  render() {
    return (
      <label>
        <span className="visually-hidden">{this.props.name}</span>
        <button type="button" onClick={this.onClick} ref={this.ioRef}>
          <span tabIndex={-1}>{
            this.props.types.indexOf(IOType.DESTINATION)
              ? '+'
              : this.props.types.indexOf(IOType.SOURCE)
                ? '-'
                : this.props.types.indexOf(IOType.MOD)
                  ? '~'
                  : 'x'
          }</span>
        </button>
      </label>);
  }
}