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

	const { current: drawSelection } = useRef(() => {
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
	});

	const { current: clearSelection } = useRef(() => {
		selectionStart.current = INVALID_POSITION;
		selectionEnd.current = INVALID_POSITION;

		drawSelection();
	});

	const { current: onResize } = useRef(() => {
		requestAnimationFrame(() => {
			if (containerRef.current && canvasRef.current) {
				document.body.getBoundingClientRect();

				const { width, height } = containerRef.current.getBoundingClientRect();

				canvasRef.current.context2d.clearRect(0, 0, width, height);
				canvasRef.current.canvas.width = width;
				canvasRef.current.canvas.height = height;

				drawSelection();
			}
		});
	});

	const { current: onMouseout } = useRef((e: MouseEvent) => {});

	useEffect(() => {
		if (containerRef.current && canvasRef.current) {
			window.addEventListener('resize', onResize, false);
			document.addEventListener('resize', onResize, false);
			window.addEventListener('mouseout', onMouseout, false);

			return () => {
				window.removeEventListener('resize', onResize, false);
				document.removeEventListener('resize', onResize, false);
				window.addEventListener('mouseout', onMouseout, false);
			};
		}
	}, [initialized, containerRef.current, canvasRef.current]);

	const selectionStart = useRef(INVALID_POSITION);
	const selectionEnd = useRef(INVALID_POSITION);

	const { current: onDrag } = useRef((e: MouseEvent) => {
		selectionEnd.current = [e.clientX, e.clientY];

		requestAnimationFrame(drawSelection);

		dispatch(actions.selectionDragContinueAction([e.clientX, e.clientY]));
	});

	const { current: onMouseUp } = useRef((e: MouseEvent) => {
		dispatch(actions.selectionDragEndAction([e.clientX, e.clientY]));

		clearSelection();

		document.body.removeEventListener('mouseup', onMouseUp);
		document.body.removeEventListener('mousemove', onDrag);
	});

	const { current: onMouseDown } = useRef(
		(e: ReactMouseEvent<HTMLDivElement>) => {
			selectionStart.current = [e.clientX, e.clientY];
			dispatch(actions.selectionDragStartAction(selectionStart.current));

			document.body.addEventListener('mouseup', onMouseUp);
			document.body.addEventListener('mousemove', onDrag);
		}
	);

	return (
		<main
			ref={(main) => {
				containerRef.current = main;
				if (containerRef.current && canvasRef.current) {
					setInitialized(true);
				}
			}}
			onMouseDown={initialized ? onMouseDown : () => {}}
		>
			<canvas
				ref={(canvas) => {
					if (canvas) {
						const context2d = canvas.getContext('2d');
						if (context2d) {
							canvasRef.current = { canvas, context2d };
							if (containerRef.current && canvasRef.current) {
								setInitialized(true);
							}
						}
					}
				}}
			/>
			{children}
		</main>
	);
};
