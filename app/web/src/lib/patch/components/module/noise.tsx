import React, { useCallback } from 'react';

import { NoiseNode } from '../../audio/nodes/noise';

import { IoConnectors } from '../module-ui/io-connectors';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const initNoise = (): ModuleState['NOISE'] => ({
	version: '0.5.0',
});

export const NoiseModule: React.FC<{ module: Module<ModuleType.NOISE> }> = ({
	module,
}) => {
	const { node, state } = useNode<NoiseNode, ModuleType.NOISE>(
		module,
		initNoise,
		() => new NoiseNode(),
	);

	const enabled = state != undefined;

	const output = useCallback(() => node.node(), [enabled]);

	return enabled ? (
		<IoConnectors
			moduleId={module.id}
			inputAccessors={{}}
			outputAccessors={{ output }}
		/>
	) : (
		<p>loading...</p>
	);
};
