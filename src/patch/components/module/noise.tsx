import React, { useCallback } from 'react';

import { NoiseNode } from '../../audio/nodes/noise';

import { IoConnectors } from '../module-ui/io-connectors';
import { IModule } from '../../state/types/module';
import { useNode } from './use-node';

const initNoise = () => ({});

export const NoiseModule: React.FC<{ module: IModule<'NOISE'> }> = ({
	module,
}) => {
	const { node, state } = useNode<NoiseNode, 'NOISE'>(
		module,
		initNoise,
		() => new NoiseNode(),
	);

	const enabled = state != undefined;

	const output = useCallback(() => node.node(), [enabled]);

	return enabled ? (
		<IoConnectors
			moduleKey={module.moduleKey}
			inputAccessors={{}}
			outputAccessors={{ output }}
		/>
	) : (
		<p>loading...</p>
	);
};
