import * as React from 'react';
import { IIO, IOContract, IOType } from '../declarations';
import { guid } from '../guid';

const buttonSymbol = (types: IOType[]): string => {
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
    return (
      <React.Fragment>
        <button className="io" type="button" onClick={this.onClick} ref={this.ioRef}>
          <span className="visually-hidden">{this.props.name}</span>
          <span tabIndex={-1}>
            {
              !!this.props.activeId && this.props.activeId === this.state.id
                ? '&darr;'
                : buttonSymbol(this.props.types)
            }
          </span>
        </button>

      </React.Fragment>
    );
  }
}