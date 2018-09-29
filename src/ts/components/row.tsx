import * as React from 'react';
import { Module } from '.';
import { IRow } from '../declarations';

export class Row extends React.Component<IRow> {
  constructor(props: IRow) {
    super(props);
  }
  render() {
    const moduleProps = {
      index: this.props.index,
      dispatch: this.props.dispatch
    };
    return (
      <section id={`row_${this.props.index}`} className={`row row_${this.props.index}`}>
        {
          this.props.row.map((mod, _) => {
            return <Module key={_} index={_} {...moduleProps} {...mod} />
          })
        }
        {/* <button type="button" onClick={this.addModule}>add module</button> */}
      </section>
    );
  }
}