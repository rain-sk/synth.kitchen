import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Connection, ModulePosition } from 'synth.kitchen-shared';

import { connectorButton, connectorKey } from '../../state/connection';
import { IPatchState } from '../../state/types/patch';
import { useMouse, useScroll } from 'react-use';
import { queueAnimation } from '../../../shared/utils/animation';
import { INVALID_POSITION } from '../../state/constants/positions';
import { getMain } from '../../../shared/utils/get-main';
import { useSyncedUpdateRef } from '../../../shared/utils';

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
const connectionToSegment = ([_, [output, input]]: [
	string,
	Connection,
]): Segment => {
	const outputPosition = position(connectorButton(connectorKey(output)));
	const inputPosition = position(connectorButton(connectorKey(input)));

	return [outputPosition, inputPosition];
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

const useManagedCanvasContext2D = (
	canvasRef: React.RefObject<HTMLCanvasElement | undefined>,
) => {
	const [_, update] = useSyncedUpdateRef(canvasRef.current);
	const contextRef = useRef<CanvasRenderingContext2D>(undefined);

	if (canvasRef.current && (!contextRef.current || update)) {
		resizeCanvas(canvasRef.current);
		contextRef.current = canvasRef.current.getContext('2d') ?? undefined;
		if (contextRef.current) {
			contextRef.current.scale(devicePixelRatio, devicePixelRatio);
		}
	}

	return contextRef.current;
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
	const context2D = useManagedCanvasContext2D(canvasRef);

	const scroll = useScroll(mainRef);
	const mouse = useMouse(mainRef);

	const drawConnections = useCallback(() => {
		const connectionsToDraw: [string, Segment][] = [];

		queueAnimation(() => {
			if (context2D && canvasRef.current) {
				context2D.clearRect(
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height,
				);

				resizeCanvas(canvasRef.current);

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

					context2D.fillStyle = '#000';
					context2D.beginPath();
					context2D.arc(outputX, outputY, 5, 0, 2 * Math.PI);
					context2D.fill();

					context2D.beginPath();
					context2D.arc(inputX, inputY, 5, 0, 2 * Math.PI);
					context2D.fill();

					context2D.beginPath();
					context2D.strokeStyle = '#000';
					context2D.lineWidth = 5;
					context2D.moveTo(outputX, outputY);
					context2D.lineTo(inputX, inputY);
					context2D.stroke();

					context2D.beginPath();
					context2D.strokeStyle = accentColor;
					context2D.lineWidth = 3;
					context2D.moveTo(outputX, outputY);
					context2D.lineTo(inputX, inputY);
					context2D.stroke();

					context2D.fillStyle = accentColor;
					context2D.beginPath();
					context2D.arc(outputX, outputY, 3, 0, 2 * Math.PI);
					context2D.fill();

					context2D.beginPath();
					context2D.arc(inputX, inputY, 3, 0, 2 * Math.PI);
					context2D.fill();
				});
			}
		}, 'cxn');

		if (activeConnectorKey !== undefined && !blockHistory) {
			connectionsToDraw.push([
				'active',
				[[mouse.elX, mouse.elY], position(connectorButton(activeConnectorKey))],
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
			const segment = connectionToSegment([key, [output, input]]);
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
