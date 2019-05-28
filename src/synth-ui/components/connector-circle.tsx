import * as React from 'react';

export interface IConnectorCircleProps {
	context: CanvasRenderingContext2D;
	x: number;
	y: number;
}

export const ConnectorCircle: React.FunctionComponent<IConnectorCircleProps> = ({ context, x, y }) => {
	context.beginPath();
	context.arc(x, y, 4, 0, 2 * Math.PI, false);
	context.fillStyle = 'rgb(203,93,255)';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = '#003300';
	context.stroke();
	return null;
}