import * as React from 'react';
import { Row } from './row';
import { IDispatch } from '../interfaces/IDispatch';
import { IModule } from '../interfaces/IModule';

export interface IKitchenProps extends IDispatch {
  modules: IModule[][];
}

export const Kitchen = (props: IKitchenProps) => {
  const rowProps = {
    dispatch: props.dispatch
  };
  return (
    <React.Fragment>
      {
        props.modules.map((row, _) => {
          return <Row key={_} index={_} row={row} {...rowProps} />
        })
      }
      {/* <button type="button" onClick={this.addRow}>add row</button> */}
    </React.Fragment>
  )
}

// export class Kitchen extends React.PureComponent<IKitchenProps> {
//   render() {
//     return (
//       <main role="main" id="kitchen">
//         {
//           this.props.modules.map((row, _) => {
//             return <Row key={_} index={_} row={row} addModule={this.props.addModule} />
//           })
//         }
//         {/* <button type="button" onClick={this.addRow}>add row</button> */}
//       </main>
//     )
//   }
// }
