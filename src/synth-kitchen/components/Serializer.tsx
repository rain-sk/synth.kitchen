import * as React from 'react';
import { modules } from '../state/module-map';
import { PatchContext } from './Patch';

export const Serializer: React.FunctionComponent = () => {
	const { racks, connections } = React.useContext(PatchContext);
	React.useEffect(() => {
		console.log(/*JSON.stringify(*/{
			racks,
			connections,
			modules: modules.all()
		}/*)*/);
	}, [racks.length, connections.length, modules.size]);
	return null;
}