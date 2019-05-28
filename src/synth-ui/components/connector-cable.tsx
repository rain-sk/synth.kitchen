import * as React from 'react';

export interface IConnectorCableProps {
	context: CanvasRenderingContext2D;
	sourceX: number;
	sourceY: number;
	cp1x: number;
	cp1y: number;
	cp2x: number;
	cp2y: number;
	destinationX: number;
	destinationY: number;
	type: string;
}

export const ConnectorCable: React.FunctionComponent<IConnectorCableProps> = ({ context, sourceX, sourceY, cp1x, cp1y, cp2x, cp2y, destinationX, destinationY, type }) => {
	context.beginPath();
	context.moveTo(sourceX, sourceY);
	context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, destinationX, destinationY);
	context.strokeStyle = type === 'SIGNAL' ? 'rgba(203,93,255,0.5)' : 'rgba(145,255,93,0.5)';
	context.lineWidth = 3;
	context.stroke();
	return null;
}