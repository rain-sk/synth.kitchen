import * as React from 'react';
// import { ModuleContext } from '../flux/module';
// import { ModuleType } from '../flux/module/module-factories';

export const AddGain: React.FunctionComponent<{ position: [number, number] }> = props => {
	//const { dispatch } = React.useContext(ModuleContext);
	const addGain = () => {
		//dispatch({ type: 'MODULE_ADD', payload: { position: props.position, type: ModuleType.GAIN } })
	}
	return (
		<button type="button" onClick={addGain}>ADD GAIN</button>
	)
}