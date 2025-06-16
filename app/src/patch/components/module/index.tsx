import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { IModule } from '../../state/types/module';
import { Modifier } from '../../../constants/key';
import { ModuleHeader } from '../module-ui/module-header';
import { IPatchAction, patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

import { ClockModule } from './clock';
import { DelayModule } from './delay';
import { EnvelopeModule } from './envelope';
import { FilterModule } from './filter';
import { GainModule } from './gain';
import { GateModule } from './gate';
import { LimiterModule } from './limiter';
import { MidiCcModule } from './midi-cc';
import { MidiClockModule } from './midi-clock';
import { MidiTriggerModule } from './midi-trigger';
import { NoiseModule } from './noise';
import { OscillatorModule } from './oscillator';
import { OutputModule } from './output';
import { PanModule } from './pan';
import { IPatchState, Position } from '../../state/types/patch';
import { SequencerModule } from './sequencer';
import { VcaModule } from './vca';
import { CompressorModule } from './compressor';
import { useLongPress } from 'react-use';
import { queueAnimation } from '../../../utils/animation';
import { ShiftModule } from './shift';

const useDragAndDrop = (
	moduleKey: string,
	initialPosition: Position,
	containerRef: React.MutableRefObject<HTMLElement | null>,
): {
	isDragging: boolean;
	startDragging: (e: ReactMouseEvent<HTMLDivElement>) => void;
	setPosition: (position: Position) => void;
} => {
	const { dispatch } = useContext(PatchContext);
	const updateModulePosition = useCallback(
		(position: Position) => {
			dispatch(patchActions.updateModulePositionAction(moduleKey, position));
		},
		[dispatch, moduleKey],
	);

	const moveContainerRef = (
		containerRef: React.MutableRefObject<HTMLElement | null>,
		position: Position,
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
			const newPosition: Position = [x, y];

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
				document.body.removeEventListener('mouseleave', onMouseUp);
				document.body.removeEventListener('mousemove', onDrag.current);
			};

			document.body.addEventListener('mouseup', onMouseUp);
			document.body.addEventListener('mouseleave', onMouseUp);
			document.body.addEventListener('mousemove', onDrag.current);
		}
	};

	const { current: setPosition } = useRef((newPosition: Position) => {
		position.current = newPosition;
		moveContainerRef(containerRef, newPosition);
	});

	return { isDragging, startDragging, setPosition };
};

const ModuleUi: React.FC<{ module: IModule }> = ({ module }) => {
	switch (module.type) {
		case 'CLOCK':
			return <ClockModule module={module as IModule<'CLOCK'>} />;
		case 'COMPRESSOR':
			return <CompressorModule module={module as IModule<'COMPRESSOR'>} />;
		case 'MIDI_CC':
			return <MidiCcModule module={module as IModule<'MIDI_CC'>} />;
		case 'MIDI_CLOCK':
			return <MidiClockModule module={module as IModule<'MIDI_CLOCK'>} />;
		case 'MIDI_TRIGGER':
			return <MidiTriggerModule module={module as IModule<'MIDI_TRIGGER'>} />;
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
		case 'PAN':
			return <PanModule module={module as IModule<'PAN'>} />;
		case 'SEQUENCER':
			return <SequencerModule module={module as IModule<'SEQUENCER'>} />;
		case 'SHIFT':
			return <ShiftModule module={module as IModule<'SHIFT'>} />;
		case 'VCA':
			return <VcaModule module={module as IModule<'VCA'>} />;
		case 'ENVELOPE':
			return <EnvelopeModule module={module as IModule<'ENVELOPE'>} />;
		default: {
			return <p>unavailable</p>;
		}
	}
};

export type ModuleProps = {
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
};

export const Module: React.FC<
	{
		module: IModule;
		position: Position;
	} & ModuleProps
> = ({
	state: { selectedModuleKeys, pendingSelection, heldModifiers },
	module,
	position,
	dispatch,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { isDragging, startDragging, setPosition } = useDragAndDrop(
		module.moduleKey,
		position,
		containerRef,
	);

	useEffect(() => {
		if (!isDragging) {
			setPosition(position);
		}
	}, [position]);

	const currentlySelected = useMemo(
		() => selectedModuleKeys.has(module.moduleKey),
		[module.moduleKey, selectedModuleKeys],
	);

	const inPendingSelection = useMemo(
		() => pendingSelection && pendingSelection.has(module.moduleKey),
		[module.moduleKey, pendingSelection],
	);

	const selectionStateString = useMemo(() => {
		if (currentlySelected === inPendingSelection) {
			return ' unselected';
		} else if (currentlySelected) {
			return ' selected';
		} else if (inPendingSelection) {
			return ' selection_pending';
		} else {
			return ' unselected';
		}
	}, [currentlySelected, inPendingSelection]);

	const draggingStateString = isDragging ? ' dragging' : '';

	const onFocus = useCallback(() => {
		dispatch(patchActions.selectSingleModuleAction(module.moduleKey));
	}, [dispatch, module.moduleKey]);

	const longPressOptions = useLongPress(() => {
		console.log('long press');
	});

	const onMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			longPressOptions.onMouseDown(e);
			const shiftClick = (heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

			if (!shiftClick && !currentlySelected) {
				if (containerRef.current) {
					containerRef.current.focus();
				} else {
					dispatch(patchActions.selectSingleModuleAction(module.moduleKey));
				}
			} else if (shiftClick && currentlySelected) {
				dispatch(patchActions.deselectModuleAction(module.moduleKey));
			} else if (shiftClick && !currentlySelected) {
				dispatch(patchActions.selectModuleAction(module.moduleKey));
			}

			startDragging(e);
		},
		[
			longPressOptions,
			currentlySelected,
			dispatch,
			module.moduleKey,
			selectedModuleKeys,
			startDragging,
		],
	);

	return (
		<div
			id={module.moduleKey}
			role="treeitem"
			aria-selected={currentlySelected}
			tabIndex={0}
			onFocus={onFocus}
			className={`module${selectionStateString}${draggingStateString}`}
			ref={containerRef}
			{...longPressOptions}
			onMouseDown={onMouseDown}
		>
			<ModuleHeader module={module} />
			<ModuleUi module={module} />
		</div>
	);
};
