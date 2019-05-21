import * as React from 'react';
import webmidi from 'webmidi';

import { Module, ModuleType } from './module';

export interface IRack {
	index: number;
	moduleKeys: string[];
}

export interface IRackProps extends IRack {
	addModule: (rackIndex: number, moduleType: ModuleType) => void;
	removeModule: (moduleKey: string) => void;
}

export const Rack: React.FunctionComponent<IRackProps> = props => {
	const [newModuleType, setNewModuleType] = React.useState('GAIN' as ModuleType);

	const handleNewModuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewModuleType(e.target.value as ModuleType);
	}

	const handleAddModuleClick = React.useCallback(() => {
		props.addModule(props.index, newModuleType);
	}, [props, newModuleType]);

	const handleRemoveModuleClick = React.useCallback((moduleKey: string) => () => {
		props.removeModule(moduleKey);
	}, [props]);

	return (
		<div className="rack">
			<ul>
				{props.moduleKeys.map((key, index) => (
					<React.Fragment key={index}>
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
