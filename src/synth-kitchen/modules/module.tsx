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

const useDragAndDrop = (
	initialX: number,
	initialY: number,
	containerRef: React.MutableRefObject<HTMLElement | null>,
	onUpdate: (x: number, y: number) => void
) => {
	const [position, setPosition] = useState({ x: initialX, y: initialY });
	const { x, y } = position;

	useEffect(() => {
		onUpdate(x, y);
	}, [x, y]);

	useEffect(
		useCallback(() => {
			requestAnimationFrame(() => {
				if (containerRef.current) {
					containerRef.current.style.left = `${x}px`;
					containerRef.current.style.top = `${y}px`;
				}
			});
		}, [containerRef.current, x, y]),
		[x, y]
	);

	const dragOffset = useRef({ x: 0, y: 0 });

	const onDrag = useRef((e: MouseEvent) => {
		setPosition({
			x: e.clientX - dragOffset.current.x,
			y: e.clientY - dragOffset.current.y
		});
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
		case 'OSCILLATOR':
			return <OscillatorModule module={module as IModule<'OSCILLATOR'>} />;
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
		[module.moduleKey]
	);

	const onMouseDown = useDragAndDrop(
		module.x,
		module.y,
		containerRef,
		onUpdatePosition
	);

	return (
		<div className="module" onMouseDown={onMouseDown} ref={containerRef}>
			<ModuleUi module={module} />
		</div>
	);
};
