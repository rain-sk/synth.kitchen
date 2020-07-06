import * as React from 'react';

export interface IConnectorCircleProps {
	context: CanvasRenderingContext2D;
	x: number;
	y: number;
}

export const ConnectionCircle: React.FunctionComponent<IConnectorCircleProps> = ({ context, x, y }) => {
	context.beginPath();
	context.arc(x, y, 4, 0, 2 * Math.PI, false);
	context.fillStyle = '#000';
	context.fill();
	context.lineWidth = 4.5;
	context.strokeStyle = '#000';
	context.stroke();
	return null;
}