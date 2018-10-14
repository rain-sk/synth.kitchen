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
      id: guid()
    };
    props.dispatch({
      type: IOContract.REGISTER,
      payload: {
        ...this.state,
        io: this.props
      }
    });
    this.triggerClick = this.triggerClick.bind(this);
    this.connectClick = this.connectClick.bind(this);
  }
  triggerClick() {
    this.props.dispatch({
      type: IOContract.TRIGGER,
      payload: {
        id: this.state.id,
        io: this.props
      }
    });
  }
  connectClick() {
    this.props.dispatch({
      type: IOContract.CONNECT,
      payload: {
        id: this.state.id,
        io: this.props
      }
    });
  }
  get active(): JSX.Element {
    return (
      <span>
        <button className="io" type="button" onClick={this.triggerClick} ref={this.trigger} aria-label={`close ${this.props.name}`}>
          <span tabIndex={-1}>&darr;</span>
        </button>
        <button className="io connect" type="button" onClick={this.connectClick} ref={this.connect} aria-label={`connect ${this.props.name}`}>
          <span tabIndex={-1}>+</span>
        </button>
      </span>
    );
  }
  get inactive(): JSX.Element {
    const contextType = this.contextType;
    const nodeType = this.props.types[0];
    const valid =
      (contextType === IOType.SOURCE && (nodeType === IOType.A_RATE || nodeType === IOType.DESTINATION)) ||
      (contextType === IOType.DESTINATION && nodeType === IOType.SOURCE) ||
      (contextType === IOType.A_RATE && nodeType === IOType.SOURCE);
    const invalid = !!contextType && !valid;
    return (
      <button
        className={`io${invalid ? ' invalid' : ''}`}
        aria-label={this.props.name}
        onClick={this.triggerClick}
        ref={this.trigger}
        type="button">
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