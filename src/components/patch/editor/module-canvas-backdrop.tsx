import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { queueAnimation } from '../../../utils/animation';

import { patchActions } from '../../../state/actions';
import { INVALID_POSITION, Position } from '../../../state/types/state';
import { AddModule } from './add-module';
import { usePatch } from '../../../hooks/use-patch';

const positionFromMouseEvent = (
	e: MouseEvent,
	scrollableElement: HTMLElement,
): Position => [
	e.clientX + scrollableElement.scrollLeft,
	e.clientY + scrollableElement.scrollTop,
];

export const ModuleCanvasBackdrop: React.FC<{
	drawOnTop: boolean;
	children: React.ReactNode;
}> = ({ children }) => {
	const { modules, modulePositions, selectedModuleKeys, dispatch } = usePatch();

	const container = useRef(undefined as HTMLElement | undefined);
	const spacer = useRef(undefined as HTMLDivElement | undefined);
	const selection = useRef({
		element: undefined as HTMLDivElement | undefined,
		start: INVALID_POSITION,
		end: INVALID_POSITION,
	});
	const isInitialized = () =>
		!!container.current && !!spacer.current && !!selection.current.element;

	const [initialized, setInitialized] = useState(false);

	const [deviceButtonPosition, setDeviceButtonPosition] =
		useState(INVALID_POSITION);

	useEffect(() => {
		setDeviceButtonPosition(INVALID_POSITION);
	}, [modules, modulePositions]);

	useEffect(() => {
		if (selectedModuleKeys.size !== 0) {
			setDeviceButtonPosition(INVALID_POSITION);
		}
	}, [selectedModuleKeys.size]);

	const drawSelection = useCallback(() => {
		if (selection.current.element) {
			if (selection.current.start.join(',') === INVALID_POSITION.join(',')) {
				selection.current.element.style.display = 'none';
			} else {
				const xStart = selection.current.start[0];
				const xEnd = selection.current.end[0];
				const yStart = selection.current.start[1];
				const yEnd = selection.current.end[1];

				selection.current.element.style.display = 'block';
				selection.current.element.style.left = `${Math.min(xStart, xEnd)}px`;
				selection.current.element.style.top = `calc(${Math.min(
					yStart,
					yEnd,
				)}px - 2.5rem)`;
				selection.current.element.style.width = `${Math.abs(xEnd - xStart)}px`;
				selection.current.element.style.height = `${Math.abs(yEnd - yStart)}px`;
			}
		}
	}, []);

	const clearSelection = useCallback(() => {
		selection.current.start = INVALID_POSITION;
		selection.current.end = INVALID_POSITION;

		drawSelection();
	}, []);

	const onResize = useCallback(() => {
		queueAnimation(() => {
			if (container.current) {
				drawSelection();
			}
		});
	}, [queueAnimation, drawSelection]);

	const onScroll = useCallback(() => {
		if (container.current && spacer.current) {
			const mainRect = container.current.getBoundingClientRect();
			const spacerRect = spacer.current.getBoundingClientRect();

			const expandTop = spacerRect.top - mainRect.top < 150;
			const expandBottom = spacerRect.bottom - mainRect.bottom < 150;
			const expandLeft = spacerRect.left - mainRect.left < 150;
			const expandRight = spacerRect.right - mainRect.right < 150;

			// console.log({ expandTop, expandBottom, expandLeft, expandRight });

			if (expandRight) {
				spacer.current.style.width = `calc(${spacerRect.width}px + 150px)`;
			}
			if (expandBottom) {
				spacer.current.style.height = `calc(${spacerRect.height}px + 150px)`;
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
		if (container.current) {
			onResize();

			window.addEventListener('resize', onResize, false);
			document.addEventListener('resize', onResize, false);
			window.addEventListener('mouseout', onMouseout, false);
			container.current.addEventListener('scroll', onScroll, false);

			return () => {
				window.removeEventListener('resize', onResize, false);
				document.removeEventListener('resize', onResize, false);
				window.addEventListener('mouseout', onMouseout, false);
				container.current?.removeEventListener('scroll', onScroll, false);
			};
		}
	}, [initialized, onResize]);

	const onDrag = useCallback(
		(e: MouseEvent) => {
			selection.current.end = positionFromMouseEvent(
				e,
				container.current as HTMLElement,
			);

			queueAnimation(drawSelection);

			dispatch(patchActions.selectionDragContinueAction(selection.current.end));
		},
		[dispatch],
	);

	const onMouseUp = useCallback(
		(e: MouseEvent) => {
			dispatch(
				patchActions.selectionDragEndAction(
					positionFromMouseEvent(e, container.current as HTMLElement),
				),
			);

			if (
				Math.abs(selection.current.start[0] - selection.current.end[0]) < 5 &&
				Math.abs(selection.current.start[1] - selection.current.end[1]) < 5
			) {
				setDeviceButtonPosition(selection.current.start);
			}

			queueAnimation(clearSelection);

			document.body.removeEventListener('mouseup', onMouseUp);
			document.body.removeEventListener('mouseleave', onMouseUp);
			document.body.removeEventListener('mousemove', onDrag);
		},
		[dispatch],
	);

	const onMouseDown = useCallback(
		(e: ReactMouseEvent<HTMLDivElement>) => {
			const position = positionFromMouseEvent(
				e.nativeEvent,
				container.current as HTMLElement,
			);

			selection.current.start = position;

			dispatch(patchActions.selectionDragStartAction(position));

			document.body.addEventListener('mouseup', onMouseUp);
			document.body.addEventListener('mouseleave', onMouseUp);
			document.body.addEventListener('mousemove', onDrag);

			onDrag(e.nativeEvent);
		},
		[dispatch],
	);

	return (
		<main
			id="main"
			ref={(main) => {
				container.current = main ?? undefined;
				setInitialized(isInitialized());
			}}
			onMouseDown={initialized ? onMouseDown : () => {}}
			onScroll={initialized ? onResize : () => {}}
		>
			<div
				id="selection"
				ref={(div) => {
					selection.current.element = div ?? undefined;
					setInitialized(isInitialized());
				}}
			/>
			<div
				id="spacer"
				ref={(div) => {
					spacer.current = div ?? undefined;
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
