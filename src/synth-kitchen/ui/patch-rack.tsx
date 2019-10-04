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

export const Rack: React.FunctionComponent<IRackProps> = props => {
	const [newModuleType, setNewModuleType] = React.useState('GAIN' as ModuleType);

	const handleNewModuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewModuleType(e.target.value as ModuleType);
	}

	const handleAddModuleClick = React.useCallback(() => {
		props.addModule(newModuleType, props.index, props.moduleKeys.length);
	}, [props, newModuleType]);

	return (
		<div className="rack">
			<button className="remove-rack" type="button" onClick={props.removeRack}>
				<span className="visually-hidden">Remove Rack</span>
			</button>
			<ul>
				{props.moduleKeys.map((key) => (
					<React.Fragment key={key}>
						<Module moduleKey={key} removeModule={props.removeModule} />
					</React.Fragment>
				))}
			</ul>
			<AddModule
				handleNewModuleTypeChange={handleNewModuleTypeChange}
				handleAddModuleClick={handleAddModuleClick}
				webmidi={webmidi}
			/>
		</div>
	);
};
