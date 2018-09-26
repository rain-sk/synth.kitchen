import * as React from 'react';
import { IIO, /*IDispatch*/ } from '../interfaces';
//import { IOType } from '../enums';

// export interface IOState extends IDispatch {
//   //
// }

export class IO extends React.Component<IIO> {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}