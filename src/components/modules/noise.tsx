import React, { useCallback } from 'react';

import { NoiseNode } from '../../audio/nodes/noise';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';

const initNoise = (
	noiseRef: React.MutableRefObject<NoiseNode | undefined>,
	state?: IModuleState['NOISE'],
) => {
	noiseRef.current = new NoiseNode();
	if (state) {
		return state;
	} else {
		return {};
	}
};

export const NoiseModule: React.FC<{ module: IModule<'NOISE'> }> = ({
	module,
}) => {
	const [noiseRef, state] = useModuleState<'NOISE', NoiseNode>(
		module,
		(ref) => () => initNoise(ref, module.state),
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
