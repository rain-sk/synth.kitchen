import React, { useCallback, useEffect, useRef } from 'react';

import { connectorButton, connectorKey } from '../../state/connection';
import { IConnectorInfo, IInput, IOutput } from '../../state/types/connection';
import { INVALID_POSITION, Position } from '../../state/types/patch';
import { useMouse, useScroll } from 'react-use';

const _ = {
	root: document.getElementById('root'),
	main: document.getElementById('main'),
};

const root = () => {
	if (!_.root) {
		_.root = document.getElementById('root');
	}
	return _.root as HTMLDivElement;
};
const main = () => {
	if (!_.main) {
		_.main = document.getElementById('main');
	}
	return _.main as HTMLElement;
};

const position = (button: HTMLButtonElement): Position => {
	if (!button) {
		return INVALID_POSITION;
	}

	const rect = button.getBoundingClientRect();
	return [
		rect.left + rect.width / 2 + window.pageXOffset,
		rect.top + rect.height / 2 + window.pageYOffset - main().offsetTop,
	];
};

const equals = (position1: Position, position2: Position) => {
	return position1[0] === position2[0] && position1[1] === position2[1];
};

type Segment = [Position, Position];
type Path = Segment[];
const connectionToPath =
	(mode: ConnectionDrawMode) =>
	([output, input]: [IOutput, IInput]): Path => {
		const outputPosition = position(connectorButton(connectorKey(output)));
		const inputPosition = position(connectorButton(connectorKey(input)));

		switch (mode) {
			case ConnectionDrawMode.DIRECT:
				return [[outputPosition, inputPosition]];

			case ConnectionDrawMode.STEPPED:
			default: {
				const path: Path = [];
				if (
					Math.sqrt(
						Math.pow(inputPosition[0] - outputPosition[0], 2) +
							Math.pow(inputPosition[1] - outputPosition[1], 2),
					) < 200
				) {
					return [[outputPosition, inputPosition]];
				}

				const addSegment = (start: Position, end: Position): Position => {
					if (equals(start, outputPosition)) {
						const endx = start[0] + 25;
						const endy = start[1];
						path.push([start, [endx, endy]]);
						return [endx, endy];
					}
					let startPosition = start;
					let endPosition = end;

					path.push([startPosition, endPosition]);
					return endPosition;
				};

				let previousEndPosition = addSegment(outputPosition, inputPosition);
				while (previousEndPosition != inputPosition) {
					previousEndPosition = addSegment(previousEndPosition, inputPosition);
				}

				return path;
			}
		}
	};

enum ConnectionDrawMode {
	DIRECT,
	STEPPED,
}

const devicePixelRatio = window.devicePixelRatio || 1;

const resizeCanvas = (canvas: HTMLCanvasElement) => {
	const rect = main().getBoundingClientRect();

	canvas.width = rect.width;
	canvas.height = rect.height;
};

export type ConnectionsProps = {
	activeConnectorKey: string | undefined;
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
	modulePositions: Record<string, Position>;
};

export const Connections: React.FC<ConnectionsProps> = ({
	activeConnectorKey,
	connections,
	connectors,
	modulePositions,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>();
	const contextRef = useRef<CanvasRenderingContext2D>();

	const scroll = useScroll({ current: main() });
	const mouse = useMouse({ current: main() });

	const drawConnections = useCallback(() => {
		const connectionsToDraw = Object.values(connections)
			.filter(
				([output, input]) =>
					connectorKey(output) in connectors &&
					connectorKey(input) in connectors,
			)
			.map(connectionToPath(ConnectionDrawMode.DIRECT));
		if (activeConnectorKey) {
			connectionsToDraw.push([
				[
					[mouse.posX, mouse.posY],
					position(connectorButton(activeConnectorKey)),
				],
			]);
		}

		requestAnimationFrame(() => {
			if (canvasRef.current && !contextRef.current) {
				contextRef.current = canvasRef.current.getContext('2d') ?? undefined;
				if (contextRef.current) {
					contextRef.current.scale(devicePixelRatio, devicePixelRatio);
				}
			}

			if (contextRef.current && canvasRef.current) {
				const context2d = contextRef.current;
				contextRef.current.clearRect(
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height,
				);

				resizeCanvas(canvasRef.current);
				const connectionsToDraw = Object.values(connections).map(
					connectionToPath(ConnectionDrawMode.DIRECT),
				);

				if (activeConnectorKey) {
					connectionsToDraw.push([
						[
							[mouse.elX, mouse.elY],
							position(connectorButton(activeConnectorKey)),
						],
					]);
				}

				connectionsToDraw.forEach((connection) => {
					const startPosition = connection[0][0];
					const endPosition = connection[connection.length - 1][1];

					context2d.fillStyle = '#000';
					context2d.beginPath();
					context2d.arc(startPosition[0], startPosition[1], 5, 0, 2 * Math.PI);
					context2d.fill();

					context2d.beginPath();
					context2d.arc(endPosition[0], endPosition[1], 5, 0, 2 * Math.PI);
					context2d.fill();

					connection.forEach((path) => {
						const [outputX, outputY] = path[0];
						const [inputX, inputY] = path[1];

						context2d.beginPath();
						context2d.strokeStyle = '#000';
						context2d.lineWidth = 5;
						context2d.moveTo(outputX, outputY);
						context2d.lineTo(inputX, inputY);
						context2d.stroke();

						context2d.beginPath();
						context2d.strokeStyle = '#b9ffce';
						context2d.lineWidth = 3;
						context2d.moveTo(outputX, outputY);
						context2d.lineTo(inputX, inputY);
						context2d.stroke();
					});

					context2d.fillStyle = '#b9ffce';
					context2d.beginPath();
					context2d.arc(startPosition[0], startPosition[1], 3, 0, 2 * Math.PI);
					context2d.fill();

					context2d.beginPath();
					context2d.arc(endPosition[0], endPosition[1], 3, 0, 2 * Math.PI);
					context2d.fill();
				});
			}
		});
	}, [activeConnectorKey, connections, connectors, scroll, mouse]);

	useEffect(() => {
		drawConnections();
	}, []);
	useEffect(drawConnections, [connections, connectors, modulePositions]);
	useEffect(drawConnections, [scroll]);
	useEffect(() => {
		if (activeConnectorKey) {
			drawConnections();
		}
	}, [mouse]);

	useEffect(() => {
		root().addEventListener('resize', drawConnections, false);
		return () => {
			root().removeEventListener('resize', drawConnections, false);
		};
	}, [drawConnections]);

	return (
		<canvas
			id="connections"
			ref={(ref) => {
				canvasRef.current = ref ?? undefined;
			}}
			style={{ position: 'fixed', top: '2.5rem' }}
		/>
	);
};
