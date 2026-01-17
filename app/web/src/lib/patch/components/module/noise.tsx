import React, { useCallback } from 'react';
import {
	Module,
	ModuleState,
	ModuleType,
	NOISE_STATE_VERSIONS,
} from 'synth.kitchen-shared';

import { NoiseNode } from '../../audio/nodes/noise';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import { audioContext } from '../../audio';

const noiseStateFromNode = (node: NoiseNode): ModuleState['NOISE'] => ({
	version: NOISE_STATE_VERSIONS[0],
	level: node.level.value,
});

const initNoise = (noise: NoiseNode, state?: ModuleState['NOISE']) => {
	if (!noise) {
		throw Error('uninitialized ref');
	}

	if (state) {
		noise.level.setValueAtTime(state.level, audioContext.currentTime);
	} else {
		state = noiseStateFromNode(noise);
	}

	return state;
};

export const NoiseModule: React.FC<{ module: Module<ModuleType.NOISE> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<NoiseNode, ModuleType.NOISE>(
		module,
		initNoise,
		() => new NoiseNode(),
	);

	const enabled = state != undefined;

	const output = useCallback(() => node.output(), [enabled]);
	const level = useCallback(() => node.level, [enabled]);

	const commitLevelChange = useCallback(
		(level: number) => {
			node.level.linearRampToValueAtTime(level, audioContext.currentTime);
			setState({
				...state,
				level,
			});
		},
		[state],
	);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{}}
				outputAccessors={{ output }}
			/>
			<NumberParameter
				moduleId={module.id}
				name="level"
				paramAccessor={level}
				value={state.level}
				commitValueCallback={commitLevelChange}
			/>
		</>
	) : (
		<p>loading...</p>
	);
};
