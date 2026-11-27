import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAsync, useMouse, useScroll } from 'react-use';

import { connectorButton } from '../../state/connection';
import {
	selectConnectionAction,
	SelectConnectionMode,
} from '../../state/actions/select-connection';
import { IPatchAction } from '../../state/actions';
import { IPatchState } from '../../state/types/patch';
import { getMain } from '../../../shared/utils';
import { Modifier } from '../../constants/key';

const line = (start: [number, number], end: [number, number]) =>
	`M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`;

const INSET = 12;

const hitArea = (from: [number, number], to: [number, number]) => {
	const dx = to[0] - from[0];
	const dy = to[1] - from[1];
	const length = Math.hypot(dx, dy) || 1;
	const t = Math.min(INSET / length, 0.4);

	return line(
		[from[0] + dx * t, from[1] + dy * t],
		[to[0] - dx * t, to[1] - dy * t],
	);
};

const emptySvg = () => <svg id="connections" role="group" aria-label="Patch cables" />;

export const ConnectionsWrapper: React.FC<{
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
}> = ({ state, dispatch }) => {
	const main = useAsync(getMain);

	if (!main.value) {
		return emptySvg();
	}

	return <Cables main={main.value} state={state} dispatch={dispatch} />;
};

const Cables: React.FC<{
	main: HTMLElement;
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
}> = ({ main, state, dispatch }) => {
	const mainRef = useRef<HTMLElement>(main);
	useScroll(mainRef);
	const mouse = useMouse(mainRef);

	const { connections, modules, selectedConnections, heldModifiers } = state;

	const shiftHeld = (heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

	const [endpoints, setEndpoints] = useState<Record<string, [number, number] | undefined>>({});
	const endpointsJson = useRef('');

	useLayoutEffect(() => {
		const el = mainRef.current;
		if (!el || !el.isConnected) return;

		const measure = () => {
			const mainRect = el.getBoundingClientRect();
			const keys = new Set<string>();
			for (const connKey of Object.keys(connections.state)) {
				for (const connectorKey of connKey.split('|')) keys.add(connectorKey);
			}
			if (state.activeConnectorKey) keys.add(state.activeConnectorKey);

			const next: Record<string, [number, number] | undefined> = {};
			for (const connectorKey of keys) {
				const button = connectorButton(connectorKey);
				if (!button) {
					next[connectorKey] = undefined;
					continue;
				}
				const rect = button.getBoundingClientRect();
				next[connectorKey] = [
					Math.floor(rect.left - mainRect.left + rect.width / 2),
					Math.floor(rect.top - mainRect.top + rect.height / 2),
				];
			}

			const json = JSON.stringify(next);
			if (json !== endpointsJson.current) {
				endpointsJson.current = json;
				setEndpoints(next);
			}
			return next;
		};

		let raf = 0;
		let frames = 0;
		const tick = () => {
			const next = measure();
			const pending = Object.values(next).some((v) => v === undefined);
			if (pending && frames++ < 90) {
				raf = requestAnimationFrame(tick);
			}
		};
		tick();

		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
		};
	});

	const el = mainRef.current;

	if (!el || !el.isConnected) {
		return emptySvg();
	}

	const cables = Object.keys(connections.state)
		.map((key) => {
			const [outputKey, inputKey] = key.split('|');
			const [output, input] = connections.state[key];

			const from = endpoints[outputKey];
			const to = endpoints[inputKey];

			if (!from || !to) {
				return undefined;
			}

			const moduleName = (id: string) =>
				modules[id]?.name ?? modules[id]?.type ?? 'module';

			return {
				key,
				outputKey,
				inputKey,
				from,
				to,
				name: `${moduleName(output.moduleId)} to ${moduleName(input.moduleId)}`,
				selected: selectedConnections.has(key),
			};
		})
		.filter((cable): cable is NonNullable<typeof cable> => cable !== undefined);

	const activeEnd = state.activeConnectorKey
		? endpoints[state.activeConnectorKey]
		: undefined;

	const focusedCable = useRef<string | undefined>(undefined);
	const wasFocused = useRef(false);
	const pointerFocus = useRef(false);

	useEffect(() => {
		const clear = () => {
			pointerFocus.current = false;
		};
		document.addEventListener('mouseup', clear);
		return () => document.removeEventListener('mouseup', clear);
	}, []);

	useEffect(() => {
		const key = focusedCable.current;

		if (key === undefined || key in connections.state) {
			return;
		}

		focusedCable.current = undefined;

		const outputKey = key.split('|')[0];

		(
			document.getElementById(outputKey) ??
			document.getElementById('module-canvas')
		)?.focus();
	}, [connections.state]);

	return (
		<svg
			id="connections"
			role="group"
			aria-label={`Patch cables: ${cables.length}`}
			style={{
				position: 'fixed',
				top: '2.5rem',
				left: 0,
				width: '100%',
				height: '100%',
				overflow: 'visible',
			}}
		>
			{cables.map((cable) => (
				<g
					key={cable.key}
					data-connection-key={cable.key}
					data-output-key={cable.outputKey}
					data-input-key={cable.inputKey}
					data-selected={cable.selected}
					className={`cable${cable.selected ? ' selected' : ''}`}
					role="button"
					tabIndex={0}
					aria-label={`Cable: ${cable.name}`}
					aria-pressed={cable.selected}
					onMouseDown={(event) => {
						event.stopPropagation();
						wasFocused.current =
							event.currentTarget.ownerDocument.activeElement === event.currentTarget;
						pointerFocus.current = true;
					}}
					onFocus={() => {
						focusedCable.current = cable.key;
						const toggle = shiftHeld && pointerFocus.current;
						pointerFocus.current = false;

						dispatch(
							selectConnectionAction(
								[cable.key],
								toggle
									? SelectConnectionMode.TOGGLE
									: SelectConnectionMode.REPLACE,
							),
						);
					}}
					onClick={(event) => {
						if (!wasFocused.current) {
							return;
						}

						dispatch(
							selectConnectionAction(
								[cable.key],
								event.shiftKey
									? SelectConnectionMode.TOGGLE
									: SelectConnectionMode.REPLACE,
							),
						);
					}}
					onKeyDown={(event) => {
						if (event.key === ' ') {
							event.preventDefault();
						}
					}}
				>
					<path className="cable-halo" d={hitArea(cable.from, cable.to)} />
					<path className="cable-hit" d={hitArea(cable.from, cable.to)} />
					<path className="cable-outline" d={line(cable.from, cable.to)} />
					<path className="cable-accent" d={line(cable.from, cable.to)} />
					<circle className="cap-outline" cx={cable.from[0]} cy={cable.from[1]} r={5} />
					<circle className="cap-outline" cx={cable.to[0]} cy={cable.to[1]} r={5} />
					<circle className="cap-accent" cx={cable.from[0]} cy={cable.from[1]} r={3} />
					<circle className="cap-accent" cx={cable.to[0]} cy={cable.to[1]} r={3} />
				</g>
			))}
			{activeEnd ? (
				<path
					data-rubber-band
					aria-hidden="true"
					className="cable-accent pending"
					d={line([mouse.elX, mouse.elY], activeEnd)}
				/>
			) : undefined}
		</svg>
	);
};
