import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef
} from 'react';

import { actions } from '../state/actions';
import { IModule } from '../state/types/module';

import { OscillatorModule } from '../modules/oscillator';
import { GainModule } from '../modules/gain';
import { DelayModule } from '../modules/delay';
import { FilterModule } from '../modules/filter';
import { OutputModule } from '../modules/output';
import { Modifier } from '../state/types/state';
import { useAnimationContext } from '../contexts/animation';
import { useStateContext } from '../contexts/state';
import { useDispatchContext } from '../contexts/dispatch';

const useDragAndDrop = (
	initialX: number,
	initialY: number,
	containerRef: React.MutableRefObject<HTMLElement | null>,
	setIsDragging: (isDraggingModules: boolean) => void,
	onUpdate: (x: number, y: number) => void,
	queueAnimationCallback: (callback: () => void) => void
): [
	React.MutableRefObject<boolean>,
	(e: ReactMouseEvent<HTMLDivElement>) => void,
	(x: number, y: number) => void
] => {
	const moveContainerRef = (
		containerRef: React.MutableRefObject<HTMLElement | null>,
		x: number,
		y: number
	) =>
		queueAnimationCallback(() => {
			if (containerRef.current) {
				containerRef.current.style.left = `${x}px`;
				containerRef.current.style.top = `${y}px`;
			}
		});

	const position = useRef({ x: initialX, y: initialY });
	const isDraggingRef = useRef(false);

	const { x, y } = position.current;

	useEffect(() => {
		moveContainerRef(containerRef, initialX, initialY);
	}, [containerRef.current]);

	const dragOffset = useRef({ x: 0, y: 0 });

	const stopDragging = () => {
		isDraggingRef.current = false;
		setIsDragging(false);
		dragOffset.current.x = 0;
		dragOffset.current.y = 0;
	};

	const onDrag = useRef((e: MouseEvent) => {
		if (e.buttons === 0) {
			stopDragging();
		} else {
			const x = e.clientX - dragOffset.current.x;
			const y = e.clientY - dragOffset.current.y;

			moveContainerRef(containerRef, x, y);

			position.current = {
				x,
				y
			};

			onUpdate(x, y);
		}
	});

	const startDragging = (e: ReactMouseEvent<HTMLDivElement>) => {
		// Prevent drawing a selection rectangle on the canvas
		e.stopPropagation();

		if (e.nativeEvent.button == 0) {
			isDraggingRef.current = true;
			setIsDragging(true);

			dragOffset.current.x = e.clientX - x;
			dragOffset.current.y = e.clientY - y;

			const onMouseUp = (e: MouseEvent) => {
				stopDragging();
				document.body.removeEventListener('mouseup', onMouseUp);
				document.body.removeEventListener('mousemove', onDrag.current);
			};

			document.body.addEventListener('mouseup', onMouseUp);
			document.body.addEventListener('mousemove', onDrag.current);
		}
	};

	const { current: setPosition } = useRef((x: number, y: number) => {
		position.current = {
			x,
			y
		};
		moveContainerRef(containerRef, x, y);
	});

	return [isDraggingRef, startDragging, setPosition];
};

const ModuleUi: React.FC<{ module: IModule }> = ({ module }) => {
	switch (module.type) {
		case 'DELAY':
			return <DelayModule module={module as IModule<'DELAY'>} />;
		case 'FILTER':
			return <FilterModule module={module as IModule<'FILTER'>} />;
		case 'GAIN':
			return <GainModule module={module as IModule<'GAIN'>} />;
		case 'OSCILLATOR':
			return <OscillatorModule module={module as IModule<'OSCILLATOR'>} />;
		case 'OUTPUT':
			return <OutputModule module={module as IModule<'OUTPUT'>} />;
		default: {
			return <p>{module.name}</p>;
		}
	}
};

export const Module: React.FunctionComponent<{
	module: IModule;
}> = ({ module }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const queueAnimationCallback = useAnimationContext();
	const dispatch = useDispatchContext();
	const { selectedModuleKeys, selectionPending, heldModifiers } =
		useStateContext();

	const onUpdatePosition = useCallback(
		(x: number, y: number) => {
			dispatch(actions.updateModulePositionAction(module.moduleKey, x, y));
		},
		[dispatch, module.moduleKey]
	);

	const setIsDragging = useCallback(
		(isDraggingModules: boolean) => {
			dispatch(actions.dragModulesAction(isDraggingModules));
		},
		[dispatch]
	);

	const [isDraggingRef, startDragging, setPosition] = useDragAndDrop(
		module.x,
		module.y,
		containerRef,
		setIsDragging,
		onUpdatePosition,
		queueAnimationCallback
	);

	useEffect(() => {
		if (!isDraggingRef.current) {
			setPosition(module.x, module.y);
		}
	}, [isDraggingRef.current, module.x, module.y]);

	const currentlySelected = useMemo(
		() => selectedModuleKeys.has(module.moduleKey),
		[selectedModuleKeys, module.moduleKey]
	);

	const selectionStateString = currentlySelected
		? selectionPending
			? ' selection_pending'
			: ' selected'
		: ' unselected';

	const draggingStateString = isDraggingRef.current ? ' dragging' : '';

	const onFocus = useCallback(() => {
		dispatch(actions.selectSingleModuleAction(module.moduleKey));
	}, [dispatch, module.moduleKey]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const shiftClick = (heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

			if (shiftClick && currentlySelected) {
				dispatch(actions.deselectModuleAction(module.moduleKey));
			} else if (shiftClick) {
				dispatch(actions.selectModuleAction(module.moduleKey));
			} else {
				containerRef.current?.focus();
			}

			startDragging(e);
		},
		[
			currentlySelected,
			dispatch,
			module.moduleKey,
			startDragging,
			selectedModuleKeys
		]
	);

	return (
		<div
			role="treeitem"
			aria-selected={currentlySelected}
			tabIndex={0}
			onFocus={onFocus}
			className={`module${selectionStateString}${draggingStateString}`}
			onMouseDown={onMouseDown}
			style={{
				width: module.width,
				height: module.height
			}}
			ref={containerRef}
		>
			<ModuleUi module={module} />
		</div>
	);
};
