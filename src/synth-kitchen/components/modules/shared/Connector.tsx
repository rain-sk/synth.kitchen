import * as React from 'react';
import { IEnd, ConnectionType } from '../../../state/patch';
import { ConnectorType } from '../BaseModuleOld';
import { PatchContext, IPatchCallbacks, IPatchState } from '../../Patch';
import { modules } from '../../../state/module-map';

export interface IConnectorProps extends IEnd {
	name: string;
	type: ConnectorType;
}

export type IConnectorInternalProps = IConnectorProps & IPatchCallbacks & IPatchState;

export class ConnectorInternal extends React.PureComponent<IConnectorInternalProps> {
	constructor(props: IConnectorInternalProps) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const { active, connectorId, moduleKey } = this.props;
		if (!active) {
			this.props.connectorActivate({
				connectorId,
				moduleKey
			});
		} else if (connectorId === active.connectorId) {
			this.props.connectorDeactivate();
		} else {
			// connect or disconnect
			const activeModule = modules.get(active.moduleKey);
			const clickedModule = modules.get(moduleKey);
			if (activeModule && clickedModule) {

				let existingConnection = this.props.connections.find(connection => (
					(connection.source.connectorId === active.connectorId && connection.destination.connectorId === connectorId) ||
					(connection.source.connectorId === connectorId && connection.destination.connectorId === active.connectorId)
				));

				if (existingConnection) {
					const sourceEnd = existingConnection.source;
					const destinationEnd = existingConnection.destination;
					// connection exists
					const connection = this.props.connections.find(connection => (
						connection.source.connectorId === sourceEnd.connectorId &&
						connection.destination.connectorId === destinationEnd.connectorId
					));
					const sourceConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
						(connector.type === 'MIDI_OUT' || connector.type === 'SIGNAL_OUT') &&
						(connector.id === sourceEnd.connectorId)
					));
					const destinationConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
						(connector.type === 'MIDI_IN' || connector.type === 'SIGNAL_IN' || connector.type === 'CV_IN') &&
						(connector.id === destinationEnd.connectorId)
					));
					if (connection && sourceConnector && destinationConnector) {
						this.props.connectorDisconnect({
							connection,
							sourceConnector,
							destinationConnector
						});
					}
				} else {
					// connection doesn't exist
					const sourceConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
						(connector.type === 'MIDI_OUT' || connector.type === 'SIGNAL_OUT') &&
						(connector.id === active.connectorId || connector.id === connectorId)
					));
					const destinationConnector = [...(activeModule.connectors || []), ...(clickedModule.connectors || [])].find(connector => (
						(connector.type === 'MIDI_IN' || connector.type === 'SIGNAL_IN' || connector.type === 'CV_IN') &&
						(connector.id === active.connectorId || connector.id === connectorId)
					));

					if (sourceConnector && destinationConnector) {

						let type: ConnectionType = 'MIDI';
						if (sourceConnector.type === 'SIGNAL_OUT' && (destinationConnector.type === 'SIGNAL_IN' || destinationConnector.type === 'CV_IN')) {
							type = 'SIGNAL';
						} else if (sourceConnector.type !== 'MIDI_OUT' || destinationConnector.type !== 'MIDI_IN') {
							this.props.connectorDeactivate();
							return;
						}

						const source: IEnd = sourceConnector.id === active.connectorId ? active : {
							connectorId,
							moduleKey
						};
						const destination: IEnd = destinationConnector.id === active.connectorId ? active : {
							connectorId,
							moduleKey
						};
						this.props.connectorConnect({
							connection: {
								type,
								source,
								destination
							},
							sourceConnector,
							destinationConnector
						});

					}
				}
			}
		}
	}

	render() {
		const { active, connectorId, name, type } = this.props;
		return (
			<button id={connectorId} type="button" className={`connector ${type}${active && active.connectorId === connectorId ? ' active' : ''}`} onClick={this.onClick}>
				<span className="visually-hidden">{name}</span>
			</button>
		);
	}
}

export const Connector: React.FunctionComponent<IConnectorProps> = props => {
	const context = React.useContext(PatchContext);
	return (
		<ConnectorInternal {...props} {...context} />
	);
}