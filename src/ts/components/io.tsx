import * as React from 'react';
import { IIO, IOContract, IOType } from '../declarations';
import { guid } from '../guid';

const getButtonSymbol = (types: IOType[]): string => {
  let res = 'x';
  types.forEach(type => {
    if (type.includes(IOType.DESTINATION)) {
      res = '+';
    } else if (type === IOType.SOURCE) {
      res = '-';
    } else if (type === IOType.MOD) {
      res = '~';
    }
  });
  return res;
}

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
    console.log(this.props.types);
    return (
      <label>
        <span className="visually-hidden">{this.props.name}</span>
        <button type="button" onClick={this.onClick} ref={this.ioRef}>
          <span tabIndex={-1}>
            {getButtonSymbol(this.props.types)}
          </span>
        </button>
      </label>);
  }
}