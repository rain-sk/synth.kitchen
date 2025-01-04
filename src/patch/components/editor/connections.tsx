import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { connectorKey } from '../../state/connection';
import { IInput, IOutput } from '../../state/types/connection';
import { INVALID_POSITION, Position } from '../../state/types/patch';
import { PatchContext } from '../../contexts/patch';
import { queueAnimationCallback } from '../../../utils/animation';
import { DerivedConnectionStateContext } from '../../contexts/derived-connection-state';

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
	(
		mode: ConnectionDrawMode,
		connectorButton: (key: string) => HTMLButtonElement,
	) =>
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

export const Connections: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>();
	const contextRef = useRef<CanvasRenderingContext2D>();
	const mousePositionRef = useRef<Position>(INVALID_POSITION);

	const { activeConnectorKey, modules, modulePositions, connections } =
		useContext(PatchContext);

	const { connectorButton } = useContext(DerivedConnectionStateContext);

	const drawConnections = useCallback(
		queueAnimationCallback(() => {
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
					connectionToPath(ConnectionDrawMode.DIRECT, connectorButton),
				);

				if (activeConnectorKey) {
					connectionsToDraw.push([
						[
							mousePositionRef.current,
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
		}),
		[activeConnectorKey, connectorButton],
	);

	const onMouseMove = useCallback(
		(e: MouseEvent) => {
			if (e.target === main()) {
				mousePositionRef.current = [e.offsetX, e.offsetY];
			} else {
				const mainRect = main().getBoundingClientRect();
				const targetRect = (e.target as HTMLElement).getBoundingClientRect();

				const mousex = e.offsetX + targetRect.left - mainRect.left;
				const mousey = e.offsetY + targetRect.top - mainRect.top;

				mousePositionRef.current = [mousex, mousey];
			}
			drawConnections();
		},
		[drawConnections],
	);

	const activeListenerRef = useRef(false);
	useEffect(() => {
		if (activeConnectorKey && !activeListenerRef.current) {
			activeListenerRef.current = true;
			mousePositionRef.current = position(connectorButton(activeConnectorKey));
			main().addEventListener('mousemove', onMouseMove);
		} else if (!activeConnectorKey) {
			activeListenerRef.current = false;
			mousePositionRef.current = INVALID_POSITION;
			main().removeEventListener('mousemove', onMouseMove);
		}

		drawConnections();

		return () => {
			if (activeListenerRef.current) {
				activeListenerRef.current = false;
				main().removeEventListener('mousemove', onMouseMove);
			}
		};
	}, [activeConnectorKey, drawConnections, connectorButton]);

	useEffect(drawConnections, [activeConnectorKey]);

	const onResize = useCallback(() => {
		const m = main();
		const width = m.offsetWidth;
		const height = m.offsetHeight;

		if (canvasRef.current && contextRef.current) {
			contextRef.current.clearRect(0, 0, width, height);
			contextRef.current.clearRect(0, 0, width, height);
			resizeCanvas(canvasRef.current);
		}

		drawConnections();
	}, [drawConnections]);

	useEffect(() => {
		root().addEventListener('resize', onResize, false);
		main().addEventListener('scroll', onResize, false);
		onResize();
		return () => {
			root().removeEventListener('resize', onResize, false);
			main().removeEventListener('scroll', onResize, false);
		};
	}, []);

	useEffect(onResize, [connections, modules, modulePositions]);

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
