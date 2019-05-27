import * as React from 'react';
import { useFlux } from 'use-flux';
import { ConnectionStore } from '../flux/connections';
import { modules } from './module-map';

interface ISerializerProps {
	racks: {
		index: number,
		moduleKeys: string[]
	}[];
}

export const Serializer: React.FunctionComponent<ISerializerProps> = props => {
	const connections = useFlux(ConnectionStore, ({ state }) => state.connections);
	React.useEffect(() => {
		console.log(JSON.stringify({
			racks: props.racks,
			connections,
			modules: Array.from(modules)
		}));
	}, [props.racks.length, connections, modules.size]);
	return null;
}