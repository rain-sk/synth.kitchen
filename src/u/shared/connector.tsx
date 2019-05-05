import * as React from 'react';
import { useFlux } from 'use-flux';
import { ConnectionStore, IEnd } from '../flux/connections';
import { ConnectorType } from './module';

export interface IConnectorProps extends IEnd {
	name: string;
	type: ConnectorType;
}

export const Connector: React.FunctionComponent<IConnectorProps> = props => {
	const { click, active } = useFlux(ConnectionStore, ({ state, dispatch }) => ({
		click: (payload: IEnd) => {
			dispatch({ type: 'CLICK', payload });
		},
		active: state.active
	}));

	const onClick = React.useCallback(() => {
		click({ ...props });
	}, [click, props]);

	return (
		<button id={props.connectorId} type="button" className={`connector ${props.type}${active && active.connectorId === props.connectorId ? ' active' : ''}`} onClick={onClick}>
			<span className="visually-hidden">{props.name}</span>
		</button>
	);
}