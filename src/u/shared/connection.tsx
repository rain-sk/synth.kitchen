import * as React from 'react';
import { ConnectionType } from '../flux/connections';

export interface IConnectionProps {
	sourceX: number;
	sourceY: number;
	destinationX: number;
	destinationY: number;
	cp1x: number;
	cp1y: number;
	cp2x: number;
	cp2y: number;
	type: ConnectionType;
	moduleCount: number;
	width: number;
	height: number;
}

export const Connection: React.FunctionComponent<IConnectionProps> = ({
	sourceX,
	sourceY,
	destinationX,
	destinationY,
	cp1x,
	cp1y,
	cp2x,
	cp2y,
	type,
	moduleCount,
	width,
	height
}) => {
	const [canvasRef] = React.useState(React.createRef<HTMLCanvasElement>());

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const parent = canvas.parentElement as HTMLSpanElement;
			const context = canvas.getContext('2d');
			if (parent && context) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = parent.offsetWidth;
				canvas.height = parent.offsetHeight;
				context.beginPath();
				context.moveTo(sourceX, sourceY);
				context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, destinationX, destinationY);
				context.strokeStyle = type === 'SIGNAL' ? 'rgba(203,93,255,0.5)' : 'rgba(145,255,93,0.5)';
				context.lineWidth = 3;
				context.stroke();
				context.beginPath();
				context.arc(sourceX, sourceY, 4, 0, 2 * Math.PI, false);
				context.fillStyle = 'rgb(203,93,255)';
				context.fill();
				context.lineWidth = 2;
				context.strokeStyle = '#003300';
				context.stroke();
				context.beginPath();
				context.arc(destinationX, destinationY, 4, 0, 2 * Math.PI, false);
				context.fillStyle = 'rgb(203,93,255)';
				context.fill();
				context.lineWidth = 2;
				context.strokeStyle = '#003300';
				context.stroke();
			}
		}
	}, [canvasRef.current, sourceX, sourceY, destinationX, destinationY, cp1x, cp1y, cp2x, cp2y, type, moduleCount, width, height]);

	return (
		<canvas ref={canvasRef} className={`connection ${type}`} />
	);
}