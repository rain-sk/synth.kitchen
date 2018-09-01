import * as React from 'react';
import { Action } from '../../SynthKitchen';
import { S8 } from '../../../S8';
import { ModuleActions } from '../collections/ModuleCollection';

export interface IModuleItemProps {
  module: any;
  rackIndex: number;
  index: number;
  reduce: (action: Action) => void;
}

export interface IModuleItemState {
  hash: string;
}

export class ModuleItem extends React.Component<IModuleItemProps, IModuleItemState> {
  constructor(props: IModuleItemProps) {
    super(props);
    this.state = {
      hash: S8()
    };
    props.reduce({
      type: ModuleActions.RegisterModule,
      payload: {
        hash: this.state.hash,
        rackIndex: props.rackIndex,
        moduleIndex: props.index
      }
    })
  }
  public render() {
    return (
      <div className="kitchen-module-item">
        {`${this.props.module}`}
      </div>
    );
  }
}
