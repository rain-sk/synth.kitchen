import React, { useCallback, useEffect, useRef } from 'react';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { audioContext } from '../../audio';
import { OutputNode } from '../../audio/nodes/output';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { Oscilloscope } from '../module-ui/webaudio-oscilloscope';
import { useNode } from './use-node';
import { useRefBackedState } from '../../../shared/utils/use-ref-backed-state';
import { useAsync, useScroll } from 'react-use';

const outputStateFromNode = (node: OutputNode): ModuleState['OUTPUT'] => ({
	version: '0.5.0',
	gain: node.gain.value,
});

const initOutput = (output: OutputNode, state?: ModuleState['OUTPUT']) => {
	if (state) {
		output.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return outputStateFromNode(output);
	}
};

function isInViewport(el: HTMLElement) {
	const rect = el.getBoundingClientRect();

	return (
		rect.bottom > 0 &&
		rect.right > 0 &&
		rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
		rect.left < (window.innerWidth || document.documentElement.clientWidth)
	);
}

const main = () => document.getElementById('main');

const getMain = (): Promise<HTMLElement> => {
	let timeout: any;
	let knownMain: HTMLElement | null = null;
	return new Promise<HTMLElement>((resolve) => {
		const checkForMain = () => {
			knownMain = knownMain ?? main();
			if (knownMain) {
				if (timeout) {
					clearTimeout(timeout);
				}
				return resolve(knownMain);
			}
			timeout = setTimeout(checkForMain, 2);
		};
		checkForMain();
	});
};

export const OutputModule: React.FC<{ module: Module<ModuleType.OUTPUT> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<OutputNode, ModuleType.OUTPUT>(
		module,
		initOutput,
		() => new OutputNode(),
	);

	const enabled = state != undefined;

	const commitGainChange = useCallback(
		(gain: number) => {
			node.gain.linearRampToValueAtTime(gain, audioContext.currentTime);
			setState({
				...state,
				gain,
			});
		},
		[setState, state],
	);

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.gain !== node.gain.value) {
			commitGainChange(module.state.gain);
		}
	}, [module.state, commitGainChange]);

	const gainAccessor = useCallback(() => {
		return node.gain;
	}, [enabled]);

	const speaker = node.speaker;
	const resampling = node.resampling;

	const [_, oscContainer, setOscContainer] =
		useRefBackedState<HTMLCanvasElement | null>(null);

	const oscRef = useRef<Oscilloscope>(undefined);
	useEffect(() => {
		const clear = () => {
			oscRef.current = undefined;
		};
		if (oscContainer && !oscRef.current) {
			oscRef.current = new Oscilloscope(
				audioContext,
				resampling(),
				oscContainer,
			);
			oscRef.current.start();
		} else if (!oscContainer) {
			clear();
		}
		return clear;
	}, [oscContainer]);

	const main = useAsync(getMain);
	const scroll = useScroll({ current: main.value as any });
	useEffect(() => {
		if (!oscContainer || !oscRef.current) {
			return;
		}
		if (isInViewport(oscContainer) && oscRef.current.isPaused) {
			oscRef.current.start();
		} else if (!isInViewport(oscContainer) && !oscRef.current.isPaused) {
			oscRef.current.pause();
		}
	}, [oscContainer, scroll]);

	return enabled ? (
		<>
			<canvas ref={setOscContainer}></canvas>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ speaker }}
				outputAccessors={{ resampling }}
			/>
			<NumberParameter
				moduleId={module.id}
				paramAccessor={gainAccessor}
				name="gain"
				value={state.gain}
				commitValueCallback={commitGainChange}
			/>
		</>
	) : null;
};
