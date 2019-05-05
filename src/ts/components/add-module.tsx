import * as React from 'react';
import { KitchenContext } from '../flux';
import { ModuleType } from '../flux/state/module-factories';
import { moduleAdd, moduleRemoveTrack } from '../flux/actions/module';

export const AddModule: React.FunctionComponent<{ trackIndex: number, index: number }> = props => {
	const [type, setType] = React.useState(ModuleType.OSCILLATOR);
	const { dispatch } = React.useContext(KitchenContext);
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
				<button type="button" onClick={() => dispatch(moduleAdd(props.trackIndex, type))}>ADD GAIN</button>
				{props.index === 0
					? <button onClick={() => dispatch(moduleRemoveTrack(props.trackIndex))} aria-label="delete">X</button>
					: null
				}
			</fieldset>
		</li>
	)
}