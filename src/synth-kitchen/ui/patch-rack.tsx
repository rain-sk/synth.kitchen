import * as React from 'react';
import webmidi from 'webmidi';

import { Module, ModuleType } from './patch-module';

export interface IRack {
	index: number;
	moduleKeys: string[];
}

export interface IRackProps extends IRack {
	addModule: (moduleType: ModuleType, rackIndex: number, moduleIndex: number) => void;
	removeModule: (moduleKey: string) => void;
}

export const Rack: React.FunctionComponent<IRackProps> = props => {
	const [newModuleType, setNewModuleType] = React.useState('GAIN' as ModuleType);

	const handleNewModuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewModuleType(e.target.value as ModuleType);
	}

	const handleAddModuleClick = React.useCallback(() => {
		props.addModule(newModuleType, props.index, props.moduleKeys.length);
	}, [props, newModuleType]);

	const handleRemoveModuleClick = React.useCallback((moduleKey: string) => () => {
		props.removeModule(moduleKey);
	}, [props]);

	return (
		<div className="rack">
			<ul>
				{props.moduleKeys.map((key) => (
					<React.Fragment key={key}>
						<Module moduleKey={key} removeModule={props.removeModule} />
					</React.Fragment>
				))}
			</ul>
			<fieldset>
				<legend>Add Module</legend>
				<select onChange={handleNewModuleTypeChange}>
					<option value={'GAIN'}>gain</option>
					<option value={'DELAY'}>delay</option>
					<option value={'FILTER'}>filter</option>
					<option value={'OSCILLATOR'}>oscillator</option>
					{webmidi.inputs.length > 0 ?
						(
							<>
								<option value={'MIDI_DEVICE'}>midi device</option>
								<option value={'MIDI_OSCILLATOR'}>midi oscillator</option>
							</>
						) : null}
				</select>
				<button onClick={handleAddModuleClick}>Add Module</button>
			</fieldset>
		</div>
	);
};
