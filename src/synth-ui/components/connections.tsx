import * as React from 'react';
import { useFlux } from 'use-flux';
import { ConnectionStore, IConnection, ConnectionType } from '../flux/connections';

function getConnectionCurves(connections: IConnection[]) {
	const curves: ICurve[] = [];
	connections.forEach(connection => {
		const source = document.getElementById(connection.source.connectorId) as HTMLButtonElement;
		const destination = document.getElementById(connection.source.connectorId) as HTMLButtonElement;
		if (source && destination) {
			const sourceBoundingClientRect = source.getBoundingClientRect();
			const destinationBoundingClientRect = destination.getBoundingClientRect();
			const sourceX = sourceBoundingClientRect.left + sourceBoundingClientRect.width / 2 + window.pageXOffset;
			const sourceY = sourceBoundingClientRect.top + sourceBoundingClientRect.height / 2 + window.pageYOffset;
			const destinationX = destinationBoundingClientRect.left + destinationBoundingClientRect.width / 2 + window.pageXOffset;
			const destinationY = destinationBoundingClientRect.top + destinationBoundingClientRect.height / 2 + window.pageYOffset;
			console.log('what');
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

function applyTo(context: CanvasRenderingContext2D, change: (context: CanvasRenderingContext2D) => void) {
	context.beginPath();
	change(context);
	context.stroke();
}

function drawCurve(context2D: CanvasRenderingContext2D, curve: ICurve) {
	applyTo(context2D, (context: CanvasRenderingContext2D) => {
		console.log('1');
		context.moveTo(curve.sourceX, curve.sourceY);
		context.bezierCurveTo(curve.cp1x, curve.cp1y, curve.cp2x, curve.cp2y, curve.destinationX, curve.destinationY);
		context.strokeStyle = curve.type === 'SIGNAL' ? 'rgba(203,93,255,0.25)' : 'rgba(145,255,93,0.25)';
		context.lineWidth = 3;
	});
	applyTo(context2D, (context: CanvasRenderingContext2D) => {
		console.log('2');
		context.arc(curve.sourceX, curve.sourceY, 4, 0, 2 * Math.PI, false);
		context.fillStyle = 'rgb(203,93,255)';
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = '#003300';
	});
	applyTo(context2D, (context: CanvasRenderingContext2D) => {
		console.log('3');
		context.arc(curve.destinationX, curve.destinationY, 4, 0, 2 * Math.PI, false);
		context.fillStyle = 'rgb(203,93,255)';
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = '#003300';
	});
}

export interface IConnectionsProps {
	moduleCount: number;
	rackCount: number;
}

export const Connections: React.FunctionComponent<IConnectionsProps> = ({ moduleCount, rackCount }) => {
	const connections = useFlux(ConnectionStore, ({ state }) => state.connections);
	const [curves, setCurves] = React.useState(getConnectionCurves(connections));

	const [parentRef] = React.useState(React.createRef<HTMLSpanElement>());
	const [canvasRef] = React.useState(React.createRef<HTMLCanvasElement>());
	const [context2D, setContext2D] = React.useState<CanvasRenderingContext2D>(undefined as any as CanvasRenderingContext2D);
	const [width, setWidth] = React.useState(window.innerWidth);
	const [height, setHeight] = React.useState(window.innerWidth);

	React.useEffect(() => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext('2d');
			if (context) {
				setContext2D(context);
			}
		}
	}, [canvasRef.current]);

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
	}, []);

	React.useEffect(() => {
		setCurves(getConnectionCurves(connections));
	}, [connections, width, height]);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const parent = canvas.parentElement as HTMLSpanElement;
			if (context2D) {
				context2D.clearRect(0, 0, canvas.width, canvas.height);
				context2D.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = parent.offsetWidth;
				canvas.height = parent.offsetHeight;
				curves.forEach((curve) => {
					const {
						sourceX,
						sourceY,
						cp1x,
						cp1y,
						cp2x,
						cp2y,
						destinationX,
						destinationY,
						type
					} = curve;
					context2D.beginPath();
					context2D.moveTo(sourceX, sourceY);
					context2D.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, destinationX, destinationY);
					context2D.strokeStyle = type === 'SIGNAL' ? 'rgba(203,93,255,0.5)' : 'rgba(145,255,93,0.5)';
					context2D.lineWidth = 3;
					context2D.stroke();
					context2D.beginPath();
					context2D.arc(sourceX, sourceY, 4, 0, 2 * Math.PI, false);
					context2D.fillStyle = 'rgb(203,93,255)';
					context2D.fill();
					context2D.lineWidth = 2;
					context2D.strokeStyle = '#003300';
					context2D.stroke();
					context2D.beginPath();
					context2D.arc(destinationX, destinationY, 4, 0, 2 * Math.PI, false);
					context2D.fillStyle = 'rgb(203,93,255)';
					context2D.fill();
					context2D.lineWidth = 2;
					context2D.strokeStyle = '#003300';
					context2D.stroke();

				});
			}
		}
	}, [context2D, curves, connections, width, height]);

	return (
		<span ref={parentRef} className="connections">
			<canvas ref={canvasRef} />
		</span>
	)
}