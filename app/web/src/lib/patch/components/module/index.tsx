import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { Modifier } from '../../constants/key';
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
import { IPatchState } from '../../state/types/patch';
import { SequencerModule } from './sequencer';
import { VcaModule } from './vca';
import { CompressorModule } from './compressor';
import { queueAnimation } from '../../../../utils/animation';
import { ShiftModule } from './shift';
import { Module, ModulePosition, ModuleType } from 'synth.kitchen-shared';

const useDragAndDrop = (
	id: string,
	initialPosition: ModulePosition,
	containerRef: React.MutableRefObject<HTMLElement | null>,
): {
	isDragging: boolean;
	startDragging: (e: ReactMouseEvent<HTMLDivElement>) => void;
	setPosition: (position: ModulePosition) => void;
} => {
	const { dispatch } = useContext(PatchContext);
	const updateModulePosition = useCallback(
		(position: ModulePosition) => {
			dispatch(patchActions.updateModulePositionAction(id, position));
		},
		[dispatch, id],
	);

	const moveContainerRef = (
		containerRef: React.MutableRefObject<HTMLElement | null>,
		position: ModulePosition,
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
			const newPosition: ModulePosition = [x, y];

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

	const { current: setPosition } = useRef((newPosition: ModulePosition) => {
		position.current = newPosition;
		moveContainerRef(containerRef, newPosition);
	});

	return { isDragging, startDragging, setPosition };
};

const ModuleUi: React.FC<{ module: Module }> = ({ module }) => {
	switch (module.type) {
		case 'CLOCK':
			return <ClockModule module={module as Module<ModuleType.CLOCK>} />;
		case 'COMPRESSOR':
			return (
				<CompressorModule module={module as Module<ModuleType.COMPRESSOR>} />
			);
		case 'MIDI_CC':
			return <MidiCcModule module={module as Module<ModuleType.MIDI_CC>} />;
		case 'MIDI_CLOCK':
			return (
				<MidiClockModule module={module as Module<ModuleType.MIDI_CLOCK>} />
			);
		case 'MIDI_TRIGGER':
			return (
				<MidiTriggerModule module={module as Module<ModuleType.MIDI_TRIGGER>} />
			);
		case 'DELAY':
			return <DelayModule module={module as Module<ModuleType.DELAY>} />;
		case 'FILTER':
			return <FilterModule module={module as Module<ModuleType.FILTER>} />;
		case 'GAIN':
			return <GainModule module={module as Module<ModuleType.GAIN>} />;
		case 'GATE':
			return <GateModule module={module as Module<ModuleType.GATE>} />;
		case 'LIMITER':
			return <LimiterModule module={module as Module<ModuleType.LIMITER>} />;
		case 'NOISE':
			return <NoiseModule module={module as Module<ModuleType.NOISE>} />;
		case 'OSCILLATOR':
			return (
				<OscillatorModule module={module as Module<ModuleType.OSCILLATOR>} />
			);
		case 'OUTPUT':
			return <OutputModule module={module as Module<ModuleType.OUTPUT>} />;
		case 'PAN':
			return <PanModule module={module as Module<ModuleType.PAN>} />;
		case 'SEQUENCER':
			return (
				<SequencerModule module={module as Module<ModuleType.SEQUENCER>} />
			);
		case 'SHIFT':
			return <ShiftModule module={module as Module<ModuleType.SHIFT>} />;
		case 'VCA':
			return <VcaModule module={module as Module<ModuleType.VCA>} />;
		case 'ENVELOPE':
			return <EnvelopeModule module={module as Module<ModuleType.ENVELOPE>} />;
		default: {
			return <p>unavailable</p>;
		}
	}
};

export type ModuleProps = {
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
};

export const ModuleWrapper: React.FC<
	{
		module: Module;
		position: ModulePosition;
	} & ModuleProps
> = ({
	state: { selectedModuleKeys, pendingSelection, heldModifiers },
	module,
	position,
	dispatch,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { isDragging, startDragging, setPosition } = useDragAndDrop(
		module.id,
		position,
		containerRef,
	);

	useEffect(() => {
		if (!isDragging) {
			setPosition(position);
		}
	}, [position]);

	const currentlySelected = useMemo(
		() => selectedModuleKeys.has(module.id),
		[module.id, selectedModuleKeys],
	);

	const inPendingSelection = useMemo(
		() => pendingSelection && pendingSelection.has(module.id),
		[module.id, pendingSelection],
	);

	const onFocus = useCallback(() => {
		dispatch(patchActions.selectSingleModuleAction(module.id));
	}, [dispatch, module.id]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			const targetNodeName = (e.target as HTMLElement).nodeName.toLowerCase();
			if (
				targetNodeName === 'input' ||
				targetNodeName === 'button' ||
				targetNodeName === 'select'
			) {
				return;
			}
			const shiftClick = (heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

			if (!shiftClick && !currentlySelected) {
				if (containerRef.current) {
					containerRef.current.focus();
				} else {
					dispatch(patchActions.selectSingleModuleAction(module.id));
				}
			} else if (shiftClick && currentlySelected) {
				dispatch(patchActions.deselectModuleAction(module.id));
			} else if (shiftClick && !currentlySelected) {
				dispatch(patchActions.selectModuleAction(module.id));
			}

			startDragging(e);
		},
		[currentlySelected, dispatch, module.id, selectedModuleKeys, startDragging],
	);

	const classNames: string[] = ['module', module.type];
	if (isDragging) {
		classNames.push('dragging');
	}
	if (currentlySelected === inPendingSelection) {
		classNames.push('unselected');
	} else if (currentlySelected) {
		classNames.push('selected');
	} else if (inPendingSelection) {
		classNames.push('selection_pending');
	} else {
		classNames.push('unselected');
	}

	return (
		<div
			id={module.id}
			role="treeitem"
			aria-selected={currentlySelected}
			tabIndex={0}
			onFocus={onFocus}
			className={classNames.join(' ')}
			data-name={module.name}
			ref={containerRef}
			onMouseDown={onMouseDown}
		>
			<ModuleHeader module={module} />
			<ModuleUi module={module} />
		</div>
	);
};
