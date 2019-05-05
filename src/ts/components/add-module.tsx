import * as React from 'react';
import { KitchenStore } from '../flux';
import { ModuleType } from '../flux/state/module-factories';
import { moduleAdd, moduleRemoveTrack } from '../flux/actions/module';
import { useFlux } from 'use-flux';

export const AddModule: React.FunctionComponent<{ trackIndex: number, index: number }> = props => {
	const [type, setType] = React.useState(ModuleType.OSCILLATOR);

	const addModule = React.useCallback(() => moduleAdd(props.trackIndex, type), [props.trackIndex, type]);
	const removeModuleTrack = React.useCallback(() => moduleRemoveTrack(props.trackIndex), [props.trackIndex]);

	const [add, remove] = useFlux(KitchenStore, ({ dispatch }) => [
		() => {
			dispatch(addModule());
		},
		() => {
			dispatch(removeModuleTrack());
		}
	]);
	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setType(e.target.value as ModuleType);
	}
	return (
		<li className="module">
			<fieldset>
				<legend>Add Module</legend>
				<label>
					Module Type
					<br />
					<select onChange={handleTypeChange} value={type}>
						{([ModuleType.DELAY,
						ModuleType.DISTORTION,
						ModuleType.FILTER,
						ModuleType.GAIN,
						ModuleType.LFO,
						ModuleType.OSCILLATOR,
						ModuleType.REVERB]).map((type, index) => (
							<option key={index} value={type}>{type}</option>
						))}
					</select>
				</label>
				<button type="button" onClick={add}>ADD GAIN</button>
				{props.index === 0
					? <button onClick={remove} aria-label="delete">X</button>
					: null
				}
			</fieldset>
		</li>
	)
}