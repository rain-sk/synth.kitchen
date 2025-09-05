import React, { useCallback } from 'react';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

import { LimiterNode } from '../../audio/nodes/limiter';

import { IoConnectors } from '../module-ui/io-connectors';
import { useNode } from './use-node';

const initLimiter = (): ModuleState['LIMITER'] => ({
	version: '0.5.0',
});

export const LimiterModule: React.FC<{
	module: Module<ModuleType.LIMITER>;
}> = ({ module }) => {
	const { node, state } = useNode<LimiterNode, ModuleType.LIMITER>(
		module,
		initLimiter,
		() => new LimiterNode(),
	);

	const enabled = state != undefined;

	const input = useCallback(() => node.input(), [enabled]);

	const output = useCallback(() => node.output(), [enabled]);

	return enabled ? (
		<IoConnectors
			moduleKey={module.moduleKey}
			inputAccessors={{ input }}
			outputAccessors={{ output }}
		/>
	) : (
		<p>loading...</p>
	);
};
