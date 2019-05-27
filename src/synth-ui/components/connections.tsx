import * as React from 'react';
import { useFlux } from 'use-flux';
import { ConnectionStore, IConnection, ConnectionType } from '../flux/connections';
import { Connection } from './connection';

function getConnectionCurves(connections: IConnection[]) {
	const curves: ICurve[] = [];
	connections.forEach(connection => {
		const source = document.getElementById(connection.source.connectorId) as HTMLButtonElement;
		const destination = document.getElementById(connection.destination.connectorId) as HTMLButtonElement;
		if (source && destination) {
			const sourceBoundingClientRect = source.getBoundingClientRect();
			const destinationBoundingClientRect = destination.getBoundingClientRect();
			const sourceX = sourceBoundingClientRect.left + sourceBoundingClientRect.width / 2 + window.pageXOffset;
			const sourceY = sourceBoundingClientRect.top + sourceBoundingClientRect.height / 2 + window.pageYOffset;
			const destinationX = destinationBoundingClientRect.left + destinationBoundingClientRect.width / 2 + window.pageXOffset;
			const destinationY = destinationBoundingClientRect.top + destinationBoundingClientRect.height / 2 + window.pageYOffset;

			curves.push({
				sourceX,
				sourceY,
				destinationX,
				destinationY,
				cp1x: (destinationX + sourceX) / 2 - ((destinationX - sourceX) * 0.1),
				cp1y: (destinationY + sourceY) / 2 + ((destinationY - sourceY) * 0.2) + Math.abs(sourceX - destinationX) * .2,
				cp2x: (destinationX + sourceX) / 2 + ((destinationX - sourceX) * 0.1),
				cp2y: ((destinationY + sourceY) / 2 + ((destinationY - sourceY) * 0.2)) + Math.abs(sourceX - destinationX) * .2,
				type: connection.type
			});
		}
	});
	return curves;
}

export interface ICurve {
	sourceX: number;
	sourceY: number;
	destinationX: number;
	destinationY: number;
	cp1x: number;
	cp1y: number;
	cp2x: number;
	cp2y: number;
	type: ConnectionType;
}

export interface IConnectionsProps {
	moduleCount: number;
}

export const Connections: React.FunctionComponent<IConnectionsProps> = ({ moduleCount }) => {
	const connections = useFlux(ConnectionStore, ({ state }) => state.connections);
	const [curves, setCurves] = React.useState(getConnectionCurves(connections));

	const [parentRef] = React.useState(React.createRef<HTMLSpanElement>());
	const [width, setWidth] = React.useState(window.innerWidth);
	const [height, setHeight] = React.useState(window.innerWidth);

	React.useEffect(() => {
		const resizeHandler = () => {
			if (parentRef.current) {
				setWidth(parentRef.current.offsetWidth);
				setHeight(parentRef.current.offsetHeight);
			}
		};
		document.addEventListener('resize', resizeHandler, false);
		resizeHandler();
		return () => {
			document.removeEventListener('resize', resizeHandler, false);
		};
	}, [parentRef]);

	React.useEffect(() => {
		setCurves(getConnectionCurves(connections));
	}, [connections, width, height]);

	return (
		<span ref={parentRef} className="connections">
			{curves.map((curve, index) =>
				<Connection
					key={index}
					moduleCount={moduleCount}
					height={height}
					width={width}
					{...curve} />
			)}
		</span>
	)
}