import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react';
import { queueAnimation } from '../utils/animation';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';

import { actions } from '../state/actions';
import { INVALID_POSITION } from '../state/types/state';
import { AddModule } from './add-module';

const positionFromMouseEvent = (
	e: MouseEvent,
	scrollableElement: HTMLElement
): [number, number] => [
	e.clientX + scrollableElement.scrollLeft,
	e.clientY + scrollableElement.scrollTop
];

const state = {
	container: undefined as HTMLElement | undefined,
	selection: {
		element: undefined as HTMLDivElement | undefined,
		start: INVALID_POSITION,
		end: INVALID_POSITION
	},
	spacer: undefined as HTMLDivElement | undefined
};

export const ModuleCanvasBackdrop: React.FC<{
	drawOnTop: boolean;
	children: React.ReactNode;
}> = ({ children }) => {
	const { modules, selectedModuleKeys } = useStateContext();
	const dispatch = useDispatchContext();

	const [initialized, setInitialized] = useState(false);

	const [deviceButtonPosition, setDeviceButtonPosition] =
		useState(INVALID_POSITION);

	useEffect(() => {
		setDeviceButtonPosition(INVALID_POSITION);
	}, [modules]);
	useEffect(() => {
		if (selectedModuleKeys.size !== 0) {
			setDeviceButtonPosition(INVALID_POSITION);
		}
	}, [deviceButtonPosition, selectedModuleKeys.size]);

	const drawSelection = useCallback(() => {
		if (state.selection.element) {
			if (state.selection.start.join(',') === INVALID_POSITION.join(',')) {
				state.selection.element.style.display = 'none';
			} else {
				const xStart = state.selection.start[0];
				const xEnd = state.selection.end[0];
				const yStart = state.selection.start[1];
				const yEnd = state.selection.end[1];

				state.selection.element.style.display = 'block';
				state.selection.element.style.left = `${Math.min(xStart, xEnd)}px`;
				state.selection.element.style.top = `calc(${Math.min(
					yStart,
					yEnd
				)}px - 2.5rem)`;
				state.selection.element.style.width = `${Math.abs(xEnd - xStart)}px`;
				state.selection.element.style.height = `${Math.abs(yEnd - yStart)}px`;
			}
		}
	}, []);

	const clearSelection = useCallback(() => {
		state.selection.start = INVALID_POSITION;
		state.selection.end = INVALID_POSITION;

		drawSelection();
	}, []);

	const isInitialized = () =>
		!!state.container && !!state.selection && !!state.spacer;

	const onResize = useCallback(() => {
		queueAnimation(() => {
			if (state.container) {
				drawSelection();
			}
		});
	}, [queueAnimation, state.container, state.spacer, modules, drawSelection]);

	const onScroll = useCallback(() => {
		if (state.container && state.spacer) {
			const mainRect = state.container.getBoundingClientRect();
			const spacerRect = state.spacer.getBoundingClientRect();

			const expandTop = spacerRect.top - mainRect.top < 150;
			const expandBottom = spacerRect.bottom - mainRect.bottom < 150;
			const expandLeft = spacerRect.left - mainRect.left < 150;
			const expandRight = spacerRect.right - mainRect.right < 150;

			// console.log({ expandTop, expandBottom, expandLeft, expandRight });

			if (expandRight) {
				state.spacer.style.width = `calc(${spacerRect.width}px + 150px)`;
			}
			if (expandBottom) {
				state.spacer.style.height = `calc(${spacerRect.height}px + 150px)`;
			}
			if (expandLeft) {
				// console.log('hmm');
			}
			if (expandTop) {
				// console.log('hmm');
			}
		}
	}, []);

	const { current: onMouseout } = useRef((/*e: MouseEvent*/) => {});

	useEffect(() => {
		if (state.container && state.selection && state.spacer) {
			onResize();

			window.addEventListener('resize', onResize, false);
			document.addEventListener('resize', onResize, false);
			window.addEventListener('mouseout', onMouseout, false);
			state.container.addEventListener('scroll', onScroll, false);

			return () => {
				window.removeEventListener('resize', onResize, false);
				document.removeEventListener('resize', onResize, false);
				window.addEventListener('mouseout', onMouseout, false);
				state.container?.removeEventListener('scroll', onScroll, false);
			};
		}
	}, [initialized, onResize, state.container, state.selection, state.spacer]);

	const onDrag = useCallback((e: MouseEvent) => {
		state.selection.end = positionFromMouseEvent(
			e,
			state.container as HTMLElement
		);

		queueAnimation(drawSelection);

		dispatch(actions.selectionDragContinueAction(state.selection.end));
	}, []);

	const onMouseUp = useCallback((e: MouseEvent) => {
		dispatch(
			actions.selectionDragEndAction(
				positionFromMouseEvent(e, state.container as HTMLElement)
			)
		);

		if (
			Math.abs(state.selection.start[0] - state.selection.end[0]) < 5 &&
			Math.abs(state.selection.start[1] - state.selection.end[1]) < 5
		) {
			setDeviceButtonPosition(state.selection.start);
		}

		queueAnimation(clearSelection);

		document.body.removeEventListener('mouseup', onMouseUp);
		document.body.removeEventListener('mousemove', onDrag);
	}, []);

	const onMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
		const position = positionFromMouseEvent(
			e.nativeEvent,
			state.container as HTMLElement
		);

		state.selection.start = position;

		dispatch(actions.selectionDragStartAction(position));

		document.body.addEventListener('mouseup', onMouseUp);
		document.body.addEventListener('mousemove', onDrag);

		onDrag(e.nativeEvent);
	}, []);

	return (
		<main
			id="main"
			ref={(main) => {
				state.container = main ?? undefined;
				setInitialized(isInitialized());
			}}
			onMouseDown={initialized ? onMouseDown : () => {}}
			onScroll={initialized ? onResize : () => {}}
		>
			<div
				id="selection"
				ref={(div) => {
					state.selection.element = div ?? undefined;
					setInitialized(isInitialized());
				}}
			/>
			<div
				id="spacer"
				ref={(div) => {
					state.spacer = div ?? undefined;
					setInitialized(isInitialized());
				}}
			/>
			{children}
			{deviceButtonPosition !== INVALID_POSITION &&
				selectedModuleKeys.size === 0 && (
					<AddModule position={deviceButtonPosition} />
				)}
		</main>
	);
};
