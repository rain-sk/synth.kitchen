import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useMouse, useScroll } from 'react-use';
import { Connection, ModulePosition as Position } from 'synth.kitchen-shared';

import { connectorButton, connectorKey } from '../../state/connection';
import { INVALID_POSITION } from '../../state/constants/positions';
import { IPatchState } from '../../state/types/patch';
import {
	queueAnimation,
	getMain,
	useSyncedUpdateRef,
} from '../../../shared/utils';

const root = () => document.getElementById('root');
const main = () => document.getElementById('main');

const position = (button: HTMLButtonElement): Position => {
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

type Segment = [Position, Position];
const connectionToSegment = (
	connectorButtonPositions: Record<string, Position>,
	outputKey: string,
	inputKey: string,
): Segment => {
	return [
		connectorButtonPositions[outputKey],
		connectorButtonPositions[inputKey],
	];
};

const devicePixelRatio = window.devicePixelRatio || 1;

const resizeCanvas = (canvas?: HTMLCanvasElement) => {
	if (!canvas) {
		return;
	}
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

const isPositionInCanvas = (
	position: Position,
	canvasRect: DOMRect,
): boolean => {
	return (
		position[0] >= canvasRect.left &&
		position[0] <= canvasRect.right &&
		position[1] >= canvasRect.top &&
		position[1] <= canvasRect.bottom
	);
};

const isSegmentInCanvas = (segment: Segment, canvasRect: DOMRect): boolean => {
	const [start, end] = segment;
	return (
		isPositionInCanvas(start, canvasRect) ||
		isPositionInCanvas(end, canvasRect) ||
		intersectsCanvas(start, end, canvasRect)
	);
};

const intersectsCanvas = (
	start: Position,
	end: Position,
	canvasRect: DOMRect,
): boolean => {
	const minX = Math.min(start[0], end[0]);
	const maxX = Math.max(start[0], end[0]);
	const minY = Math.min(start[1], end[1]);
	const maxY = Math.max(start[1], end[1]);

	return !(
		maxX < canvasRect.left ||
		minX > canvasRect.right ||
		maxY < canvasRect.top ||
		minY > canvasRect.bottom
	);
};

const activeConnectorPendingConnection = (
	mouseX: number,
	mouseY: number,
	activeConnectorKey: string,
): [string, Segment] => {
	return [
		'active',
		[[mouseX, mouseY], position(connectorButton(activeConnectorKey))],
	];
};

const connectionsToDraw = (
	connectorButtonPositions: Record<string, Position>,
	connections: Record<string, Connection>,
	canvasRect: DOMRect,
) => {
	const connectionsToDraw: [string, Segment][] = [];
	for (const entry of Object.entries(connections)) {
		const [id, [output, input]] = entry;

		const outputKey = connectorKey(output);
		const inputKey = connectorKey(input);
		if (
			!(
				outputKey in connectorButtonPositions &&
				inputKey in connectorButtonPositions
			)
		) {
			continue;
		}

		try {
			const segment = connectionToSegment(
				connectorButtonPositions,
				outputKey,
				inputKey,
			);
			if (!isSegmentInCanvas(segment, canvasRect)) {
				continue;
			}
			connectionsToDraw.push([id, segment]);
		} catch (err) {
			console.warn(err);
		}
	}
	return connectionsToDraw;
};

const makeDraw =
	(state: IPatchState, context2D?: CanvasRenderingContext2D) =>
	(connection: [string, Segment]) => {
		if (!context2D) {
			return;
		}
		const [id, segment] = connection;
		const selected = state.selectedConnections.has(id);
		const selectionPending = state.pendingConnectionSelection?.has(id) ?? false;
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
}> = ({ state, mainRef }) => {
	const { activeConnectorKey, connections } = state;
	const canvasRef = useRef<HTMLCanvasElement>(undefined);
	const context2D = useManagedCanvasContext2D(canvasRef);

	const connectorButtonPositions = useMemo(() => {
		const cache: Record<string, Position> = {};
		for (const key of Object.keys(state.connectors)) {
			cache[key] = position(connectorButton(key));
		}
		return cache;
	}, [state.modulePositions, state.modules, state.connectors]);

	const draw = makeDraw(state, context2D);

	const mouse = useMouse(mainRef);
	const scroll = useScroll(mainRef);

	const drawConnections = useCallback(
		() =>
			queueAnimation(() => {
				if (!(canvasRef.current && context2D)) {
					return;
				}

				context2D.clearRect(
					0,
					0,
					canvasRef.current.clientWidth ?? 0,
					canvasRef.current.clientHeight,
				);

				if (activeConnectorKey !== undefined) {
					draw(
						activeConnectorPendingConnection(
							mouse.elX,
							mouse.elY,
							activeConnectorKey,
						),
					);
				}

				for (const connection of connectionsToDraw(
					connectorButtonPositions,
					connections.state,
					canvasRef.current.getBoundingClientRect(),
				)) {
					draw(connection);
				}
			}),
		[
			context2D,
			connectorButtonPositions,
			mouse.elX,
			mouse.elY,
			connections,
			activeConnectorKey,
		],
	);

	useEffect(() => {
		drawConnections();
	}, [
		connectorButtonPositions,
		mouse.elX,
		mouse.elY,
		scroll.x,
		scroll.y,
		connections,
		activeConnectorKey,
	]);

	useEffect(() => {
		if (canvasRef.current) {
			function resize() {
				resizeCanvas(canvasRef.current);
			}
			root()?.addEventListener('resize', resize, false);
			return () => {
				root()?.removeEventListener('resize', resize, false);
			};
		}
	}, [drawConnections]);

	return (
		<canvas
			id="connections"
			ref={canvasRef as React.RefObject<HTMLCanvasElement>}
			style={{ position: 'fixed', top: '2.5rem' }}
		/>
	);
};
