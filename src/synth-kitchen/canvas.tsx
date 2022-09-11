import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react';

import { actions, IAction } from './state/actions';
import { SelectionDragType } from './state/actions/selection-drag';
import { INVALID_POSITION } from './state/types/state';

export const Canvas: React.FC<{
	children: React.ReactNode;
	dispatch: React.Dispatch<IAction>;
}> = ({ children, dispatch }) => {
	const containerRef = useRef<HTMLElement | null>(null);
	const canvasRef = useRef<{
		canvas: HTMLCanvasElement;
		context2d: CanvasRenderingContext2D;
	} | null>(null);

	const [initialized, setInitialized] = useState(false);

	const initContainer = useCallback(
		(container: HTMLElement) => {
			containerRef.current = container;
			setInitialized(!!containerRef.current && !!canvasRef.current);
		},
		[setInitialized]
	);

	const initCanvas = useCallback(
		(canvas: HTMLCanvasElement) => {
			const context2d = canvas.getContext('2d');
			if (context2d) {
				canvasRef.current = { canvas, context2d };
				setInitialized(!!containerRef.current && !!canvasRef.current);
			}
		},
		[setInitialized]
	);

	const selectionStart = useRef(INVALID_POSITION);
	const selectionEnd = useRef(INVALID_POSITION);

	const onDrag = useRef((e: MouseEvent) => {
		selectionEnd.current = [e.clientX, e.clientY];
		drawSelection();

		dispatch(actions.selectionDragContinueAction([e.clientX, e.clientY]));
	});

	const onMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
		selectionStart.current = [e.clientX, e.clientY];
		dispatch(actions.selectionDragStartAction(selectionStart.current));

		const onMouseUp = (e: MouseEvent) => {
			dispatch(actions.selectionDragEndAction([e.clientX, e.clientY]));

			clearSelection();

			document.body.removeEventListener('mouseup', onMouseUp);
			document.body.removeEventListener('mousemove', onDrag.current);
		};

		document.body.addEventListener('mouseup', onMouseUp);
		document.body.addEventListener('mousemove', onDrag.current);
	};

	function drawSelection() {
		if (containerRef.current && canvasRef.current) {
			canvasRef.current.context2d.clearRect(
				0,
				0,
				containerRef.current.clientWidth,
				containerRef.current.offsetHeight
			);

			canvasRef.current.context2d.beginPath();
			const x = selectionStart.current[0];
			const y = selectionStart.current[1];
			const w = selectionEnd.current[0] - x;
			const h = selectionEnd.current[1] - y;
			canvasRef.current.context2d.strokeRect(x, y, w, h);
		}
	}

	function clearSelection() {
		selectionStart.current = INVALID_POSITION;
		selectionEnd.current = INVALID_POSITION;

		drawSelection();
	}

	return (
		<main
			ref={(main) => (main ? initContainer(main) : {})}
			onMouseDown={initialized ? onMouseDown : () => {}}
		>
			<canvas ref={(canvas) => (canvas ? initCanvas(canvas) : {})} />
			{children}
		</main>
	);
};
