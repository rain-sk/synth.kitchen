import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { ModulePosition } from 'synth.kitchen-shared';

import { AddModule } from './add-module';
import { IPatchState } from '../../state/types/patch';
import { IPatchAction, patchActions } from '../../state/actions';
import { queueAnimation } from '../../../../utils/animation';
import { UseScrollContext } from '../../contexts/use-scroll';
import { INVALID_POSITION } from '../../state/constants/positions';

const positionFromMouseEvent = (
	e: MouseEvent,
	scrollableElement: HTMLElement,
): ModulePosition => [
	e.clientX + scrollableElement.scrollLeft,
	e.clientY + scrollableElement.scrollTop,
];

export type ModuleCanvasBackdropProps = {
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
};

export const ModuleCanvasBackdrop: React.FC<
	React.PropsWithChildren<ModuleCanvasBackdropProps>
> = ({
	state: { modules, modulePositions, selectedModuleKeys },
	dispatch,
	children,
}) => {
	const container = useRef<HTMLElement | undefined>(undefined);
	const spacer = useRef<HTMLDivElement | undefined>(undefined);
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

	const [draggingSelection, setDraggingSelection] = useState(false);

	const drawSelection = useCallback(() => {
		if (selection.current.element) {
			if (selection.current.start.join(',') === INVALID_POSITION.join(',')) {
				setDraggingSelection(false);
				selection.current.element.style.display = 'none';
			} else {
				setDraggingSelection(true);
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
	}, [setDraggingSelection]);

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
		queueAnimation(() => {
			if (container.current && spacer.current) {
				const mainRect = container.current.getBoundingClientRect();
				const spacerRect = spacer.current.getBoundingClientRect();

				const expandTop = spacerRect.top - mainRect.top < 300;
				const expandBottom = spacerRect.bottom - mainRect.bottom < 300;
				const expandLeft = spacerRect.left - mainRect.left < 300;
				const expandRight = spacerRect.right - mainRect.right < 300;

				if (expandRight) {
					spacer.current.style.width = `calc(${spacerRect.width}px + 100vw)`;
				}
				if (expandBottom) {
					spacer.current.style.height = `calc(${spacerRect.height}px + 100vh)`;
				}
				if (expandLeft) {
					// console.log({ expandLeft });
				}
				if (expandTop) {
					// console.log({ expandTop });
				}
			}
		}, 'scroll');
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
		<UseScrollContext.Provider
			value={container as React.RefObject<HTMLElement>}
		>
			<main
				id="main"
				className={draggingSelection ? 'selection-drag' : ''}
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
		</UseScrollContext.Provider>
	);
};
