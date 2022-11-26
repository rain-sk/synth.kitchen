import React, {
	MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react';

import { actions } from '../state/actions';
import { IModule } from '../state/types/module';
import { useDispatch } from '../state';

import { OscillatorModule } from './oscillator';
import { GainModule } from './gain';
import { DelayModule } from './delay';
import { FilterModule } from './filter';
import { OutputModule } from './output';

const useDragAndDrop = (
	initialX: number,
	initialY: number,
	containerRef: React.MutableRefObject<HTMLElement | null>,
	onUpdate: (x: number, y: number) => void
) => {
	const position = useRef({ x: initialX, y: initialY });

	const { x, y } = position.current;

	useEffect(() => {
		if (containerRef.current) {
			requestAnimationFrame(() => {
				if (containerRef.current) {
					containerRef.current.style.left = `${initialX}px`;
					containerRef.current.style.top = `${initialY}px`;
				}
			});
		}
	}, [containerRef.current]);

	const dragOffset = useRef({ x: 0, y: 0 });

	const onDrag = useRef((e: MouseEvent) => {
		const x = e.clientX - dragOffset.current.x;
		const y = e.clientY - dragOffset.current.y;

		requestAnimationFrame(() => {
			if (containerRef.current) {
				containerRef.current.style.left = `${x}px`;
				containerRef.current.style.top = `${y}px`;
			}
		});

		position.current = {
			x,
			y
		};

		onUpdate(x, y);
	});

	const onMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
		dragOffset.current.x = e.clientX - x;
		dragOffset.current.y = e.clientY - y;

		const onMouseUp = (e: MouseEvent) => {
			dragOffset.current.x = 0;
			dragOffset.current.y = 0;
			document.body.removeEventListener('mouseup', onMouseUp);
			document.body.removeEventListener('mousemove', onDrag.current);
		};

		document.body.addEventListener('mouseup', onMouseUp);
		document.body.addEventListener('mousemove', onDrag.current);
	};

	return onMouseDown;
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
			return (
				<>
					<p>{JSON.stringify(module)}</p>
					<p>{module.moduleKey}</p>
				</>
			);
		}
	}
};

export const Module: React.FunctionComponent<{ module: IModule }> = ({
	module
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const onUpdatePosition = useCallback(
		(x: number, y: number) => {
			dispatch(actions.updateModulePositionAction(module.moduleKey, x, y));
		},
		[dispatch, module.moduleKey]
	);

	return (
		<div
			className="module"
			onMouseDown={useDragAndDrop(
				module.x,
				module.y,
				containerRef,
				onUpdatePosition
			)}
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
