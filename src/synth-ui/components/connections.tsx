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
	rackCount: number
}

export const Connections: React.FunctionComponent<IConnectionsProps> = ({ moduleCount, rackCount }) => {
	const { active, connections } = useFlux(ConnectionStore, ({ state }) => state);

	const [parentRef] = React.useState(React.createRef<HTMLSpanElement>());
	const [canvasRef] = React.useState(React.createRef<HTMLCanvasElement>());
	const [context2d, setContext2d] = React.useState<CanvasRenderingContext2D | undefined>();

	const [curves, setCurves] = React.useState(getConnectionCurves(connections));

	React.useEffect(() => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext('2d');
			if (context) {
				setContext2d(context);
			}
		}
	}, [canvasRef.current]);


	const updateCurves = React.useCallback(() => {
		console.log('updating curves');
		setCurves(getConnectionCurves(connections));
	}, [context2d, connections, moduleCount, rackCount]);

	React.useEffect(() => {
		document.addEventListener('resize', () => {
			const width = parentRef.current ? parentRef.current.offsetWidth : 0;
			const height = parentRef.current ? parentRef.current.offsetHeight : 0;
			if (canvasRef.current && context2d) {
				if (context2d) {
					context2d.clearRect(0, 0, width, height);
					context2d.clearRect(0, 0, width, height);
					canvasRef.current.width = width;
					canvasRef.current.height = height;
				}
			}
			updateCurves();
		}, false);
		updateCurves();
		return () => {
			document.removeEventListener('resize', updateCurves, false);
		};
	}, []);

	React.useEffect(() => {
		const width = parentRef.current ? parentRef.current.offsetWidth : 0;
		const height = parentRef.current ? parentRef.current.offsetHeight : 0;
		if (canvasRef.current && context2d) {
			if (context2d) {
				context2d.clearRect(0, 0, width, height);
				context2d.clearRect(0, 0, width, height);
				canvasRef.current.width = width;
				canvasRef.current.height = height;
			}
		}
		updateCurves();
	}, [active, connections, moduleCount, rackCount]);

	return (
		<span ref={parentRef} className="connections">
			<canvas ref={canvasRef} />
			{curves.map((curve, index) =>
				context2d ?
					<Connection
						context={context2d}
						key={index}
						{...curve} />
					: null
			)}
		</span>
	)
}