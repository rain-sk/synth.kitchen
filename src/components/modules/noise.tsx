import React, { useCallback } from 'react';

import { NoiseNode } from '../../audio/nodes/noise';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { useNodeRef } from '../../hooks/use-node-ref';

const initNoise = (
	noiseRef: React.MutableRefObject<NoiseNode | undefined>,
	state?: IModuleState['NOISE'],
) => {
	if (!noiseRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		return state;
	} else {
		return {};
	}
};

export const NoiseModule: React.FC<{ module: IModule<'NOISE'> }> = ({
	module,
}) => {
	const noiseRef = useNodeRef(() => new NoiseNode());
	const [state] = useModuleState<'NOISE', NoiseNode>(noiseRef, module, () =>
		initNoise(noiseRef, module.state),
	);

	const enabled = state != undefined;

	const output = useCallback(() => noiseRef.current?.node() as any, [enabled]);

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
