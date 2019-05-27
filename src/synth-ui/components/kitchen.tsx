import * as React from 'react';

import { Rack, IRack } from './rack';
import { ModuleType, IModule } from './module';
import { modules } from './module-map';
import { useFlux } from 'use-flux';
import { ConnectionStore } from '../flux/connections';
import { Connector } from './connector';
import { Connections } from './connections';
import { Login } from './login';
import { Serializer } from './serializer';
import { Sidebar } from './sidebar';
import { AuthenticationStore } from '../flux/authentication';

const { v4 } = require('uuid');

export const Kitchen: React.FunctionComponent = () => {
	const clear = useFlux(ConnectionStore, ({ dispatch }) => (moduleKey: string) => {
		dispatch({ type: 'CLEAR', payload: { moduleKey } })
	});
	const isLoggingIn = useFlux(AuthenticationStore, ({ state }) => state.isLoggingIn);

	const [racks, setRacks] = React.useState([{
		index: 0,
		moduleKeys: []
	}] as IRack[]);

	const addRack = React.useCallback(() => {
		setRacks([...racks, {
			index: racks.length,
			moduleKeys: []
		}]);
	}, [racks]);

	const removeRack = React.useCallback((rackIndex: number) => () => {
		const remove: string[] = [];
		racks[rackIndex].moduleKeys.forEach(key => {
			remove.push(key);
		});

		const newRacks = racks.filter(rack => rack.index !== rackIndex);
		newRacks.forEach((rack, index) => {
			rack.index = index;
		});

		setRacks(newRacks);

		remove.forEach(key => clear(key));
	}, [clear, racks]);

	const addModule = React.useCallback((rackIndex: number, moduleType: ModuleType) => {
		const key = v4();
		const newModule: IModule = {
			moduleKey: key,
			type: moduleType
		};

		modules.set(key, newModule);

		racks[rackIndex].moduleKeys = [...racks[rackIndex].moduleKeys, key];
		setRacks([...racks]);
	}, [racks]);

	const removeModule = React.useCallback((moduleKey: string) => {
		const module = modules.get(moduleKey);
		module && module.node && module.node.stop && module.node.stop();

		setRacks(racks.map(rack => ({
			...rack,
			moduleKeys: rack.moduleKeys.filter(key => key !== moduleKey)
		})));

		clear(moduleKey);
	}, [clear, racks]);

	const onDragEnd = (e: any) => {
		console.log(e);
	}

	return (
		<>
			<Sidebar />
			<Connector type="SIGNAL_IN" name={'speakers'} connectorId={'GLOBAL_CONTEXT'} moduleKey={'GLOBAL_CONTEXT'} />
			{racks.map(rack => (
				<React.Fragment key={rack.index}>
					<button type="button" onClick={removeRack(rack.index)}>Remove Rack</button>
					<Rack {...rack} addModule={addModule} removeModule={removeModule} />
				</React.Fragment>
			))}
			<button type="button" onClick={addRack}>Add Rack</button>
			<Connections moduleCount={modules.size} />
			<Serializer racks={racks} />
			{isLoggingIn ? <Login /> : null}
		</>
	);
};
