import * as React from 'react';
import { ModuleContext } from '../flux/module';
import { ModuleType } from '../flux/module/module-factories';

export const AddModule: React.FunctionComponent<{ trackIndex: number }> = props => {
	const [type, setType] = React.useState(ModuleType.OSCILLATOR);
	const { dispatch } = React.useContext(ModuleContext);
	const addModule = () => {
		dispatch({ type: 'ADD_MODULE', payload: { track: props.trackIndex, type } });
	}
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
				<button type="button" onClick={addModule}>ADD GAIN</button>
			</fieldset>
		</li>
	)
}