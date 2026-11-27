import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAsync, useMouse } from 'react-use';

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
	const mouse = useMouse(mainRef);

	const { connections, modules, selectedConnections, heldModifiers } = state;

	const shiftHeld = (heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

	const [layer, setLayer] = useState<{
		endpoints: Record<string, [number, number] | undefined>;
		width: number;
		height: number;
	}>({ endpoints: {}, width: 0, height: 0 });
	const layerJson = useRef('');

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

			const endpoints: Record<string, [number, number] | undefined> = {};
			for (const connectorKey of keys) {
				const button = connectorButton(connectorKey);
				if (!button) {
					endpoints[connectorKey] = undefined;
					continue;
				}
				const rect = button.getBoundingClientRect();
				endpoints[connectorKey] = [
					Math.floor(rect.left - mainRect.left + el.scrollLeft + rect.width / 2),
					Math.floor(rect.top - mainRect.top + el.scrollTop + rect.height / 2),
				];
			}

			const next = { endpoints, width: el.scrollWidth, height: el.scrollHeight };
			const json = JSON.stringify(next);
			if (json !== layerJson.current) {
				layerJson.current = json;
				setLayer(next);
			}
			return endpoints;
		};

		let raf = 0;
		let frames = 0;
		const reschedule = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				measure();
			});
		};

		const retry = () => {
			const endpoints = measure();
			const pending = Object.values(endpoints).some((v) => v === undefined);
			if (pending && frames++ < 90) {
				raf = requestAnimationFrame(retry);
			}
		};
		retry();

		const observer = new ResizeObserver(reschedule);
		observer.observe(el);
		const canvas = el.querySelector('#module-canvas');
		if (canvas) {
			observer.observe(canvas);
		}
		const spacer = el.querySelector('#spacer');
		if (spacer) {
			observer.observe(spacer);
		}

		const mutations = new MutationObserver(reschedule);
		if (canvas) {
			mutations.observe(canvas, {
				subtree: true,
				childList: true,
				attributes: true,
				attributeFilter: ['style'],
			});
		}

		return () => {
			if (raf) cancelAnimationFrame(raf);
			observer.disconnect();
			mutations.disconnect();
		};
	}, [connections.state, state.modulePositions, state.activeConnectorKey, state.loadEpoch]);

	const el = mainRef.current;

	if (!el || !el.isConnected) {
		return emptySvg();
	}

	const cables = Object.keys(connections.state)
		.map((key) => {
			const [outputKey, inputKey] = key.split('|');
			const [output, input] = connections.state[key];

			const from = layer.endpoints[outputKey];
			const to = layer.endpoints[inputKey];

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
		? layer.endpoints[state.activeConnectorKey]
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
				position: 'absolute',
				left: 0,
				top: 0,
				width: layer.width,
				height: layer.height,
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
					d={line(
						[
							Math.floor(mouse.elX + el.scrollLeft),
							Math.floor(mouse.elY + el.scrollTop),
						],
						activeEnd,
					)}
				/>
			) : undefined}
		</svg>
	);
};
