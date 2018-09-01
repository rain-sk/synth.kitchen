import * as React from 'react';
import { ModuleCollection } from '../collections';
import { Action } from '../../SynthKitchen';

export interface IRackItem {
  rack: any;
  index: number;
  reduce: (action: Action) => void;
}

export class RackItem extends React.Component<IRackItem> {
  public render() {
    return (
      <div className="kitchen-rack-item">
        <ModuleCollection modules={this.props.rack} index={this.props.index} reduce={this.props.reduce} />
      </div>
    );
  }
}
