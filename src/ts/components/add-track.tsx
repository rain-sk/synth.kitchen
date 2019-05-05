import * as React from 'react';
import { KitchenContext } from '../flux';
import { moduleAddTrack } from '../flux/actions/module';

export const AddTrack: React.FunctionComponent = () => {
	const { dispatch } = React.useContext(KitchenContext);

	return (
		<li>
			<button type="button" onClick={() => dispatch(moduleAddTrack())}>ADD TRACK</button>
		</li>
	)
}