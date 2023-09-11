import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef
} from 'react';

import { actions } from '../state/actions';
import { IModule } from '../state/types/module';

import { OscillatorModule } from './modules/oscillator';
import { GainModule } from './modules/gain';
import { DelayModule } from './modules/delay';
import { FilterModule } from './modules/filter';
import { NoiseModule } from './modules/noise';
import { OutputModule } from './modules/output';
import { Modifier } from '../state/types/state';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';
import { queueAnimation } from '../animation';
import { ClockModule } from './modules/clock';
import { SequencerModule } from './modules/sequencer';
import { GateModule } from './modules/gate';
import { AdsrModule } from './modules/adsr';
import { VcaModule } from './modules/vca';
import { EnvelopeModule } from './modules/envelope';
import { LimiterModule } from './modules/limiter';

const useDragAndDrop = (
	initialX: number,
	initialY: number,
	containerRef: React.MutableRefObject<HTMLElement | null>,
	setIsDragging: (isDraggingModules: boolean) => void,
	onUpdate: (x: number, y: number) => void
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
		queueAnimation(() => {
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

			const onMouseUp = () => {
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

const ModuleHeader: React.FC<{ module: IModule }> = ({ module }) => {
	return <h2>{module.name}</h2>;
};

const ModuleUi: React.FC<{ module: IModule }> = ({ module }) => {
	switch (module.type) {
		case 'ADSR':
			return <AdsrModule module={module as IModule<'ADSR'>} />;
		case 'CLOCK':
			return <ClockModule module={module as IModule<'CLOCK'>} />;
		case 'DELAY':
			return <DelayModule module={module as IModule<'DELAY'>} />;
		case 'FILTER':
			return <FilterModule module={module as IModule<'FILTER'>} />;
		case 'GAIN':
			return <GainModule module={module as IModule<'GAIN'>} />;
		case 'GATE':
			return <GateModule module={module as IModule<'GATE'>} />;
		case 'LIMITER':
			return <LimiterModule module={module as IModule<'LIMITER'>} />;
		case 'NOISE':
			return <NoiseModule module={module as IModule<'NOISE'>} />;
		case 'OSCILLATOR':
			return <OscillatorModule module={module as IModule<'OSCILLATOR'>} />;
		case 'OUTPUT':
			return <OutputModule module={module as IModule<'OUTPUT'>} />;
		case 'SEQUENCER':
			return <SequencerModule module={module as IModule<'SEQUENCER'>} />;
		case 'VCA':
			return <VcaModule module={module as IModule<'VCA'>} />;
		case 'ENVELOPE':
			return <EnvelopeModule module={module as IModule<'ENVELOPE'>} />;
		default: {
			return <p>unavailable</p>;
		}
	}
};

export const Module: React.FunctionComponent<{
	module: IModule;
}> = ({ module }) => {
	const containerRef = useRef<HTMLDivElement>(null);
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
		onUpdatePosition
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

			dispatch(actions.historyPushAction());

			if (!shiftClick && !currentlySelected) {
				if (containerRef.current) {
					containerRef.current.focus();
				} else {
					dispatch(actions.selectSingleModuleAction(module.moduleKey));
				}
			} else if (shiftClick && currentlySelected) {
				dispatch(actions.deselectModuleAction(module.moduleKey));
			} else if (shiftClick && !currentlySelected) {
				dispatch(actions.selectModuleAction(module.moduleKey));
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
			id={module.moduleKey}
			role="treeitem"
			aria-selected={currentlySelected}
			tabIndex={0}
			onFocus={onFocus}
			className={`module${selectionStateString}${draggingStateString}`}
			onMouseDown={onMouseDown}
			ref={containerRef}
		>
			<ModuleHeader module={module} />
			<ModuleUi module={module} />
		</div>
	);
};
