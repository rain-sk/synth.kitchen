import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import { actions } from '../state/actions';
import { IModule } from '../state/types/module';

import { ClockModule } from './modules/clock';
import { DelayModule } from './modules/delay';
import { EnvelopeModule } from './modules/envelope';
import { FilterModule } from './modules/filter';
import { GainModule } from './modules/gain';
import { GateModule } from './modules/gate';
import { LimiterModule } from './modules/limiter';
import { MidiClockModule } from './modules/midi-clock';
import { Modifier } from '../state/types/state';
import { NoiseModule } from './modules/noise';
import { OscillatorModule } from './modules/oscillator';
import { OutputModule } from './modules/output';
import { queueAnimation } from '../utils/animation';
import { SequencerModule } from './modules/sequencer';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';
import { VcaModule } from './modules/vca';

const useDragAndDrop = (
	moduleKey: string,
	initialPosition: [number, number],
	containerRef: React.MutableRefObject<HTMLElement | null>
): [
	boolean,
	(e: ReactMouseEvent<HTMLDivElement>) => void,
	(position: [number, number]) => void
] => {
	const dispatch = useDispatchContext();
	const updateModulePosition = useCallback(
		(position: [number, number]) => {
			dispatch(actions.updateModulePositionAction(moduleKey, position));
		},
		[dispatch, moduleKey]
	);

	const moveContainerRef = (
		containerRef: React.MutableRefObject<HTMLElement | null>,
		position: [number, number]
	) =>
		queueAnimation(() => {
			if (containerRef.current) {
				containerRef.current.style.left = `${position[0]}px`;
				containerRef.current.style.top = `${position[1]}px`;
			}
		});

	const position = useRef(initialPosition);
	const [isDragging, setIsDragging] = useState(false);

	const [x, y] = position.current;

	useEffect(() => {
		moveContainerRef(containerRef, initialPosition);
	}, [containerRef.current]);

	const dragOffset = useRef({ x: 0, y: 0 });

	const stopDragging = () => {
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
			const newPosition: [number, number] = [x, y];

			moveContainerRef(containerRef, newPosition);

			position.current = newPosition;

			updateModulePosition(newPosition);
		}
	});

	const startDragging = (e: ReactMouseEvent<HTMLDivElement>) => {
		// Prevent drawing a selection rectangle on the canvas
		e.stopPropagation();

		if (e.nativeEvent.button == 0) {
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

	const { current: setPosition } = useRef((newPosition: [number, number]) => {
		position.current = newPosition;
		moveContainerRef(containerRef, newPosition);
	});

	return [isDragging, startDragging, setPosition];
};

const ModuleHeader: React.FC<{ module: IModule }> = ({ module }) => {
	return <h2>{module.name}</h2>;
};

const ModuleUi: React.FC<{ module: IModule }> = ({ module }) => {
	switch (module.type) {
		case 'CLOCK':
			return <ClockModule module={module as IModule<'CLOCK'>} />;
		case 'MIDI_CLOCK':
			return <MidiClockModule module={module as IModule<'MIDI_CLOCK'>} />;
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
	position: [number, number];
}> = ({ module, position }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatchContext();
	const { selectedModuleKeys, selectionPending, heldModifiers } =
		useStateContext();

	const [isDragging, startDragging, setPosition] = useDragAndDrop(
		module.moduleKey,
		position,
		containerRef
	);

	useEffect(() => {
		if (!isDragging) {
			setPosition(position);
		}
	}, [position]);

	const currentlySelected = useMemo(
		() => selectedModuleKeys.has(module.moduleKey),
		[selectedModuleKeys, module.moduleKey]
	);

	const selectionStateString = useMemo(
		() =>
			currentlySelected
				? selectionPending
					? ' selection_pending'
					: ' selected'
				: ' unselected',
		[currentlySelected, selectionPending]
	);

	const draggingStateString = isDragging ? ' dragging' : '';

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
