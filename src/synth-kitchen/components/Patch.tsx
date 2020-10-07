import * as React from 'react';

import { Connections } from './connections/Connection';
import { Connector } from './modules/shared/Connector';
import { ModuleType, IModule, IConnector } from '../state/patch';
import { modules } from '../state/module-map';
import { Rack, IRack } from './Rack';
import { IEnd, IConnection } from '../state/patch';
import { uniqueId } from '../io/unique-id';
import { Serializer } from './Serializer';

export interface IConnectPayload {
	connection: IConnection;
	sourceConnector: IConnector;
	destinationConnector: IConnector;
}

export interface IPatchCallbacks {
	connectorActivate: (end: IEnd) => void;
	connectorDeactivate: () => void;
	connectorConnect: (payload: IConnectPayload) => void;
	connectorDisconnect: (payload: IConnectPayload) => void;
	moduleAdd: (moduleType: ModuleType, rackIndex: number, slotIndex: number) => void;
	moduleRackRemove: (rackIndex: number) => void;
	moduleRemove: (moduleKey: string) => void;
}

export interface IPatchState {
	active?: IEnd;
	connections: IConnection[];
	racks: IRack[];
}

export const PatchContext = React.createContext<IPatchCallbacks & IPatchState>(
	{
		connectorActivate: () => null,
		connectorDeactivate: () => null,
		connectorConnect: () => null,
		connectorDisconnect: () => null,
		moduleAdd: () => null,
		moduleRackRemove: () => null,
		moduleRemove: () => null,
		connections: [],
		racks: []
	}
)

export class Patch extends React.Component<{}, IPatchState> {
	constructor(props: any) {
		super(props);

		this.state = {
			connections: [],
			racks: [{ index: 0, moduleKeys: [] }]
		};
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
		this.state.racks.forEach(rack => {
			rack.moduleKeys.forEach(key => {
				this.moduleRemove(key);
			});
		});
	}

	handleKeyDown = (event: KeyboardEvent) => {
		switch (event.which || event.keyCode) {
			case 27:
				if (this.state.active) {
					this.setState({
						active: undefined
					});
				}
		}
	}

	getContextValue = () => {
		return {
			connectorActivate: this.connectorActivate,
			connectorDeactivate: this.connectorDeactivate,
			connectorConnect: this.connectorConnect,
			connectorDisconnect: this.connectorDisconnect,
			moduleAdd: this.moduleAdd,
			moduleRackRemove: this.moduleRackRemove,
			moduleRemove: this.moduleRemove,
			...this.state
		};
	}

	render() {
		return (
			<PatchContext.Provider value={this.getContextValue()}>
				<Connector type="SIGNAL_IN" name={'speakers'} connectorId={'GLOBAL_CONTEXT'} moduleKey={'GLOBAL_CONTEXT'} />
				{this.state.racks.map(rack => (
					<Rack key={rack.index} {...rack} removeRack={this.moduleRackRemove(rack.index)} addModule={this.moduleAdd} removeModule={this.moduleRemove} />
				))}
				<button className="add-rack" type="button" onClick={this.moduleRackAdd}>Add Rack</button>
				<Connections moduleCount={modules.size()} rackCount={this.state.racks.length} active={this.state.active} connections={this.state.connections} />
				<Serializer />
			</PatchContext.Provider>
		)
	}

	connectorActivate = (active: IEnd) => {
		this.setState({ active });
	}

	connectorDeactivate = () => {
		this.setState({ active: undefined });
	}

	connectorConnect = (payload: IConnectPayload) => {
		const { connection, sourceConnector, destinationConnector } = payload;
		sourceConnector.getter().connect(destinationConnector.getter());
		this.setState({
			active: undefined,
			connections: [...this.state.connections, connection]
		});
	}

	connectorDisconnect = (payload: IConnectPayload) => {
		const { connection, sourceConnector, destinationConnector } = payload;
		sourceConnector.getter().disconnect(destinationConnector.getter());
		const connections = this.state.connections.filter(con => (
			con.source.connectorId !== connection.source.connectorId ||
			con.destination.connectorId !== connection.destination.connectorId
		));
		this.setState({
			active: undefined,
			connections
		});
	}

	moduleAdd = (moduleType: ModuleType, rackIndex: number, slotIndex: number) => {

		let moduleKey = '';

		/* create a record of the module */
		// if (moduleType === 'DELAY') {
		// 	const delay = new DelayModule(moduleType);
		// 	modules.set(delay.moduleKey, delay);
		// 	moduleKey = delay.moduleKey;
		// } else {
		const _moduleKey = uniqueId();
		const newModule: IModule = {
			moduleKey: _moduleKey,
			type: moduleType
		};
		moduleKey = _moduleKey;
		modules.set(_moduleKey, newModule);
		// }

		/* add the new module to the UI */
		const { racks } = this.state;
		if (rackIndex === this.state.racks.length) {
			const newRack: IRack = {
				index: rackIndex,
				moduleKeys: [moduleKey]
			};
			this.state.racks.push(newRack);
		} else {
			this.state.racks[rackIndex].moduleKeys.splice(slotIndex, 0, moduleKey);
		}
		this.setState({ racks: [...racks] });
	}

	moduleRelease = (module: IModule) => {
		this.state.connections.forEach(connection => {
			if (connection.source.moduleKey === module.moduleKey || connection.destination.moduleKey === module.moduleKey) {
				const sourceModule = modules.get(connection.source.moduleKey);
				const destinationModule = modules.get(connection.destination.moduleKey);
				if (sourceModule && destinationModule && sourceModule.connectors && destinationModule.connectors) {
					const sourceConnector = sourceModule.connectors.find(connector => connector.id === connection.source.connectorId);
					const destinationConnector = destinationModule.connectors.find(connector => connector.id === connection.destination.connectorId);
					if (sourceConnector && destinationConnector) {
						this.connectorDisconnect({
							connection,
							sourceConnector,
							destinationConnector
						});
					}
				}
			}
		});
		modules.delete(module.moduleKey);
		this.setState({
			active: undefined
		});
	}

	moduleRackAdd = () => {
		let { racks } = this.state;

		racks.push({
			index: racks.length,
			moduleKeys: []
		});

		this.setState({
			racks
		});
	}

	moduleRackRemove = (rackIndex: number) => {
		return () => {

			let { racks } = this.state;

			const remove: string[] = [];

			/* collect the keys of modules which need to be removed */
			racks[rackIndex].moduleKeys.forEach(key => {
				remove.push(key);
			});

			/* remove the deleted rack and update rack indices */
			racks = racks.filter(rack => rack.index !== rackIndex);
			racks.forEach((rack, index) => {
				rack.index = index;
			});

			/* clean up the modules in the removed rack */
			this.setState({ racks: racks.length > 0 ? racks : [{ index: 0, moduleKeys: [] }] }, () => {
				remove.forEach(key => this.moduleRemove(key));
			});

		}
	}

	moduleRemove = (moduleKey: string) => {
		const module = modules.get(moduleKey);
		if (module) {

			/* stop the module if it needs to be stopped */
			if (module.node && module.node.stop) {
				module.node.stop();
			}

			/* remove the module from its rack */
			const racks = this.state.racks.map(rack => ({
				index: rack.index,
				moduleKeys: rack.moduleKeys.filter(key => key !== moduleKey)
			}));

			/* clear the module */
			this.setState({ racks }, () => {
				this.moduleRelease(module);
			});

		}
	}
}
