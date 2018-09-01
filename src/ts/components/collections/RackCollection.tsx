import * as React from 'react';
import { RackItem } from '../items/RackItem';
import { Action } from '../../SynthKitchen';

export enum RackActions {
  AddRack = 'ADD_RACK',
  RemoveRack = 'REMOVE_RACK'
}

export interface IRackCollection {
  racks: any[][];
  reduce: (action: Action) => void;
}

export class RackCollection extends React.Component<IRackCollection> {
  constructor(props: IRackCollection) {
    super(props);
    this.addRack = this.addRack.bind(this);
  }
  private addRack() {
    this.props.reduce({ type: RackActions.AddRack });
  }
  public render() {
    const racks = this.props.racks.map((rack, index) => {
      return <RackItem rack={rack} index={index} key={index} reduce={this.props.reduce} />
    });
    return (
      <div className="kitchen-rack-collection">
        {racks}
        <button type="button" onClick={this.addRack} className="kitchen-rack-item">
          +
        </button>
      </div>
    );
  }
}
