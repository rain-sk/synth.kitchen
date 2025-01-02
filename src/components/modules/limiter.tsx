import React, { useCallback } from 'react';

import { LimiterNode } from '../../audio/nodes/limiter';

import { IModule } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { useNode } from '../../hooks/use-node';

const initLimiter = () => ({});

export const LimiterModule: React.FC<{ module: IModule<'LIMITER'> }> = ({
	module,
}) => {
	const { node, state } = useNode<LimiterNode, 'LIMITER'>(
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
