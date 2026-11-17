import React, { useRef } from 'react';
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

export const ConnectionsWrapper: React.FC<{
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
}> = ({ state, dispatch }) => {
	const main = useAsync(getMain);

	if (!main.value) {
		return <svg id="connections" role="group" aria-label="Patch cables" />;
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

	const el = mainRef.current;

	if (!el || !el.isConnected) {
		return <svg id="connections" role="group" aria-label="Patch cables" />;
	}

	const mainRect = el.getBoundingClientRect();

	const endpoint = (key: string): [number, number] | undefined => {
		const button = connectorButton(key);

		if (!button) {
			return undefined;
		}

		const rect = button.getBoundingClientRect();

		return [
			Math.floor(rect.left - mainRect.left + rect.width / 2),
			Math.floor(rect.top - mainRect.top + rect.height / 2),
		];
	};

	const cables = Object.keys(connections.state)
		.map((key) => {
			const [outputKey, inputKey] = key.split('|');
			const [output, input] = connections.state[key];

			const from = endpoint(outputKey);
			const to = endpoint(inputKey);

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
		? endpoint(state.activeConnectorKey)
		: undefined;

	const focusedCable = useRef<string | undefined>(undefined);

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
					onMouseDown={(event) => event.stopPropagation()}
					onFocus={() => {
						focusedCable.current = cable.key;
						dispatch(
							selectConnectionAction(
								[cable.key],
								shiftHeld
									? SelectConnectionMode.ADD
									: SelectConnectionMode.REPLACE,
							),
						);
					}}
					onClick={(event) =>
						dispatch(
							selectConnectionAction(
								[cable.key],
								event.shiftKey
									? SelectConnectionMode.TOGGLE
									: SelectConnectionMode.REPLACE,
							),
						)
					}
					onKeyDown={(event) => {
						if (event.key === ' ') {
							event.preventDefault();
						}
					}}
				>
					<path className="cable-hit" d={line(cable.from, cable.to)} />
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
