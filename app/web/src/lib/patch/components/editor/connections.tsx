import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Connection, ModulePosition } from 'synth.kitchen-shared';

import {
	connectionKey,
	connectorButton,
	connectorKey,
} from '../../state/connection';
import { IPatchState } from '../../state/types/patch';
import { useMouse, useScroll } from 'react-use';
import { queueAnimation } from '../../../shared/utils/animation';
import { INVALID_POSITION } from '../../state/constants/positions';
import { getMain } from '../../../shared/utils/get-main';

const root = () => document.getElementById('root');
const main = () => document.getElementById('main');

const position = (button: HTMLButtonElement): ModulePosition => {
	if (!button) {
		return INVALID_POSITION;
	}

	const rect = button.getBoundingClientRect();
	const mainRect = main()?.getBoundingClientRect();
	return [
		rect.left + rect.width / 2 + window.pageXOffset - (mainRect?.x ?? 0),
		rect.top + rect.height / 2 + window.pageYOffset - (main()?.offsetTop ?? 0),
	];
};

type Segment = [ModulePosition, ModulePosition];
const connectionToPath = ([_, [output, input]]: [string, Connection]): [
	string,
	Segment,
] => {
	const outputPosition = position(connectorButton(connectorKey(output)));
	const inputPosition = position(connectorButton(connectorKey(input)));

	return [connectionKey(output, input), [outputPosition, inputPosition]];
};

const devicePixelRatio = window.devicePixelRatio || 1;

const resizeCanvas = (canvas: HTMLCanvasElement) => {
	try {
		const rect = main()?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

		if (rect && rect.width > 0 && rect.height > 0) {
			canvas.width = rect.width;
			canvas.height = rect.height;
		}
	} catch (e) {
		console.warn(e);
	}
};

export const ConnectionsWrapper: React.FC<{ state: IPatchState }> = ({
	state,
}) => {
	const [mainLoaded, setMainLoaded] = useState(false);
	const mainRef = useRef<HTMLElement>(undefined);

	useEffect(() => {
		getMain().then((main) => {
			mainRef.current = main;
			setMainLoaded(true);
		});
	}, []);

	return mainLoaded && mainRef.current !== undefined ? (
		<Connections
			state={state}
			mainRef={mainRef as React.RefObject<HTMLElement>}
		/>
	) : null;
};

const Connections: React.FC<{
	state: IPatchState;
	mainRef: React.RefObject<HTMLElement>;
}> = ({
	state: {
		activeConnectorKey,
		blockHistory,
		connections,
		connectors,
		modulePositions,
		selectedConnections,
		pendingConnectionSelection,
	},
	mainRef,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(undefined);
	const contextRef = useRef<CanvasRenderingContext2D>(undefined);

	const scroll = useScroll(mainRef);
	const mouse = useMouse(mainRef);

	const drawConnections = useCallback(() => {
		const connectionsToDraw: [string, Segment][] = [];

		queueAnimation(() => {
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

				const connectionsToDraw = Object.entries(connections.state).map(
					connectionToPath,
				);

				if (activeConnectorKey && !blockHistory) {
					connectionsToDraw.push([
						'active',

						[
							[mouse.elX, mouse.elY],
							position(connectorButton(activeConnectorKey)),
						],
					]);
				}

				connectionsToDraw.forEach((connection) => {
					const [id, segment] = connection;
					const selected = selectedConnections.has(id);
					const selectionPending = pendingConnectionSelection?.has(id) ?? false;
					const accentColor = selectionPending
						? '#ffbf6f'
						: selected
						? '#c98900'
						: '#ffecdc';

					const [outputX, outputY] = segment[0];
					const [inputX, inputY] = segment[1];

					context2d.fillStyle = '#000';
					context2d.beginPath();
					context2d.arc(outputX, outputY, 5, 0, 2 * Math.PI);
					context2d.fill();

					context2d.beginPath();
					context2d.arc(inputX, inputY, 5, 0, 2 * Math.PI);
					context2d.fill();

					context2d.beginPath();
					context2d.strokeStyle = '#000';
					context2d.lineWidth = 5;
					context2d.moveTo(outputX, outputY);
					context2d.lineTo(inputX, inputY);
					context2d.stroke();

					context2d.beginPath();
					context2d.strokeStyle = accentColor;
					context2d.lineWidth = 3;
					context2d.moveTo(outputX, outputY);
					context2d.lineTo(inputX, inputY);
					context2d.stroke();

					context2d.fillStyle = accentColor;
					context2d.beginPath();
					context2d.arc(outputX, outputY, 3, 0, 2 * Math.PI);
					context2d.fill();

					context2d.beginPath();
					context2d.arc(inputX, inputY, 3, 0, 2 * Math.PI);
					context2d.fill();
				});
			}
		}, 'cxn');

		if (activeConnectorKey !== undefined) {
			connectionsToDraw.push([
				'active',
				[
					[mouse.posX, mouse.posY],
					position(connectorButton(activeConnectorKey)),
				],
			]);
		}

		for (const [key, [output, input]] of Object.entries(connections.state)) {
			if (
				!(
					connectorKey(output) in connectors &&
					connectorKey(input) in connectors
				)
			) {
				continue;
			}
			const [_, segment] = connectionToPath([key, [output, input]]);
			connectionsToDraw.push([key, segment]);
		}
	}, [
		activeConnectorKey,
		blockHistory,
		connections,
		connectors,
		scroll,
		mouse,
		selectedConnections,
		pendingConnectionSelection,
	]);

	useEffect(() => {
		drawConnections();
	}, [drawConnections]);
	useEffect(() => {
		drawConnections();
	}, [
		activeConnectorKey,
		blockHistory,
		connections,
		connectors,
		modulePositions,
		scroll,
	]);
	useEffect(() => {
		if (activeConnectorKey) {
			drawConnections();
		}
	}, [mouse]);

	useEffect(() => {
		root()?.addEventListener('resize', drawConnections, false);
		return () => {
			root()?.removeEventListener('resize', drawConnections, false);
		};
	}, [drawConnections]);

	return (
		<canvas
			id="connections"
			ref={canvasRef as React.RefObject<HTMLCanvasElement>}
			style={{ position: 'fixed', top: '2.5rem' }}
		/>
	);
};
