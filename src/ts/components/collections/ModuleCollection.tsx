import * as React from 'react';
import { ModuleItem } from '../items';
import { Action } from '../../SynthKitchen';

export enum ModuleActions {
  AddModule = 'ADD_MODULE',
  RemoveModule = 'REMOVE_MODULE',
  RegisterModule = 'REGISTER_MODULE'
}

export interface IModuleCollection {
  modules: any[];
  index: number;
  reduce: (action: Action) => void;
}

export class ModuleCollection extends React.Component<IModuleCollection> {
  constructor(props: IModuleCollection) {
    super(props);
    this.addModule = this.addModule.bind(this);
  }
  private addModule() {
    this.props.reduce({ type: ModuleActions.AddModule, payload: this.props.index });
  };
  public render() {
    const modules = this.props.modules.map((mod, index) => {
      return <ModuleItem module={mod} key={index} index={index} rackIndex={this.props.index} reduce={this.props.reduce} />
    });
    return (
      <div className="kitchen-module-collection">
        {modules}
        <button type="button" onClick={this.addModule} className="kitchen-module-item">
          +
        </button>
      </div>
    );
  }
}
