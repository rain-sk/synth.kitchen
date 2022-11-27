import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react';
import { useAnimationContext } from '../hooks/use-animation-context';
import { useDispatchContext } from '../hooks/use-dispatch-context';

import { actions } from '../state/actions';
import { INVALID_POSITION } from '../state/types/state';

const positionFromMouseEvent = (e: MouseEvent): [number, number] => [
	e.clientX + document.documentElement.scrollLeft,
	e.clientY + document.documentElement.scrollTop
];

export const ResizableCanvas: React.FC<{
	drawOnTop: boolean;
	children: React.ReactNode;
}> = ({ drawOnTop, children }) => {
	const queueAnimationCallback = useAnimationContext();
	const dispatch = useDispatchContext();

	const containerRef = useRef<HTMLElement | null>(null);
	const canvasRef = useRef<{
		canvas: HTMLCanvasElement;
		context2d: CanvasRenderingContext2D;
	} | null>(null);

	const [initialized, setInitialized] = useState(false);

	const selectionStart = useRef(INVALID_POSITION);
	const selectionEnd = useRef(INVALID_POSITION);

	const { current: drawSelection } = useRef(() => {
		if (containerRef.current && canvasRef.current) {
			canvasRef.current.context2d.clearRect(
				0,
				0,
				containerRef.current.clientWidth,
				containerRef.current.offsetHeight
			);

			canvasRef.current.context2d.strokeStyle = 'rgba(255, 255, 255, 0.75)';

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
		queueAnimationCallback(() => {
			if (containerRef.current && canvasRef.current) {
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
			onResize();

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

	const { current: onDrag } = useRef((e: MouseEvent) => {
		selectionEnd.current = positionFromMouseEvent(e);

		queueAnimationCallback(drawSelection);

		dispatch(actions.selectionDragContinueAction(selectionEnd.current));
	});

	const { current: onMouseUp } = useRef((e: MouseEvent) => {
		dispatch(actions.selectionDragEndAction(positionFromMouseEvent(e)));

		queueAnimationCallback(() => clearSelection());

		document.body.removeEventListener('mouseup', onMouseUp);
		document.body.removeEventListener('mousemove', onDrag);
	});

	const { current: onMouseDown } = useRef(
		(e: ReactMouseEvent<HTMLDivElement>) => {
			const position = positionFromMouseEvent(e.nativeEvent);
			selectionStart.current = position;
			selectionEnd.current = position;

			dispatch(actions.selectionDragStartAction(position));

			document.body.addEventListener('mouseup', onMouseUp);
			document.body.addEventListener('mousemove', onDrag);
		}
	);

	const HtmlCanvas = () => (
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
			{!drawOnTop && <HtmlCanvas />}
			{children}
			{drawOnTop && <HtmlCanvas />}
		</main>
	);
};
