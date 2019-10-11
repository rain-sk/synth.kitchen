import * as React from 'react';
import webmidi from 'webmidi';

import { Module, ModuleType } from './patch-module';
import { AddModule } from './patch-rack-add-module';

export interface IRack {
	index: number;
	moduleKeys: string[];
}

export interface IRackProps extends IRack {
	addModule: (moduleType: ModuleType, rackIndex: number, moduleIndex: number) => void;
	removeModule: (moduleKey: string) => void;
	removeRack: () => void;
}

export class Rack extends React.Component<IRackProps, { newModuleType: ModuleType }>{
	constructor(props: IRackProps) {
		super(props);
		this.state = {
			newModuleType: 'GAIN'
		};
	}

	handleNewModuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({
			newModuleType: e.target.value as ModuleType
		});
	}

	handleAddModuleClick = () => {
		this.props.addModule(this.state.newModuleType, this.props.index, this.props.moduleKeys.length);
	}

	render() {
		return (
			<div className="rack" >
				<button className="remove-rack" type="button" onClick={this.props.removeRack}>
					<span className="visually-hidden">Remove Rack</span>
				</button>
				<ul>
					{this.props.moduleKeys.map((key) => (
						<React.Fragment key={key}>
							<Module moduleKey={key} removeModule={this.props.removeModule} />
						</React.Fragment>
					))}
				</ul>
				<AddModule
					handleNewModuleTypeChange={this.handleNewModuleTypeChange}
					handleAddModuleClick={this.handleAddModuleClick}
					webmidi={webmidi}
				/>
			</div>
		);
	}
};
