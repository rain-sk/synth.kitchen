import * as React from 'react';
import { IIO, IOContract, IOType, IIOState } from '../declarations';
import { guid } from '../guid';

const buttonSymbol = (types: IOType[]): string => {
  let res = 'x';
  types.forEach(type => {
    if (res === 'x') {
      if (type.includes(IOType.DESTINATION)) {
        res = '+';
      } else if (type === IOType.SOURCE) {
        res = '-';
      } else if (type === IOType.MOD) {
        res = '~';
      }
    }
  });
  return res;
}

export class IO extends React.Component<IIO, IIOState> {
  trigger: React.Ref<HTMLButtonElement> = React.createRef();
  connect: React.Ref<HTMLButtonElement> = React.createRef();
  disconnect: React.Ref<HTMLButtonElement> = React.createRef();
  clear: React.Ref<HTMLButtonElement> = React.createRef();
  settings: React.Ref<HTMLButtonElement> = React.createRef();
  private _buttonSymbol: string;
  constructor(props: IIO) {
    super(props);
    this.state = {
      id: guid(),
      trigger: this.trigger,
      connect: this.connect,
      disconnect: this.disconnect,
      clear: this.clear,
      settings: this.settings
    };
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
  get active(): JSX.Element {
    return (
      <button className="io" type="button" onClick={this.onClick} ref={this.trigger} aria-label={`close ${this.props.name}`}>
        <span tabIndex={-1}>&darr;</span>
      </button>
    );
  }
  get inactive(): JSX.Element {
    return (
      <button className="io" type="button" onClick={this.onClick} ref={this.trigger} aria-label={this.props.name}>
        <span tabIndex={-1}>{this.buttonSymbol}</span>
      </button>
    );
  }
  get buttonSymbol(): string {
    if (!this._buttonSymbol) this._buttonSymbol = buttonSymbol(this.props.types);
    return this._buttonSymbol;
  }
  get contextActive(): boolean {
    return !!this.props.context ? this.props.context[0] : false;
  }
  get contextId(): string | undefined {
    return !!this.props.context ? this.props.context[1] : undefined;;
  }
  get contextType(): IOType | undefined {
    return !!this.props.context ? this.props.context[2] : undefined;
  }
  render() {
    return !!this.contextId && this.contextId === this.state.id ? // is this state currently active?
      this.active :
      this.inactive;
  }
}