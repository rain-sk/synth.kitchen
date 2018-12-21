import * as React from 'react';
import { ModuleContext } from '../flux/module';

export const AddTrack: React.FunctionComponent = () => {
	const { dispatch } = React.useContext(ModuleContext);
	const addTrack = () => {
		dispatch({ type: 'ADD_TRACK' });
	}
	return (
		<li>
			<button type="button" onClick={addTrack}>ADD TRACK</button>
		</li>
	)
}