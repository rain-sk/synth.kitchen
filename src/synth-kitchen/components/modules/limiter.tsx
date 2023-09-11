import React, { useCallback, useRef } from 'react';

import { LimiterNode } from '../../audio/nodes/limiter';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';

const initLimiter = (
	limiterRef: React.MutableRefObject<LimiterNode | undefined>,
	state?: IModuleState['LIMITER']
) => {
	limiterRef.current = new LimiterNode();
	if (state) {
		return state;
	} else {
		return {};
	}
};

export const LimiterModule: React.FC<{ module: IModule<'LIMITER'> }> = ({
	module
}) => {
	const limiterRef = useRef<LimiterNode>();
	const [state] = useModuleState<'LIMITER'>(
		() => initLimiter(limiterRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined && limiterRef.current;

	const input = limiterRef.current?.input as any;
	const output = limiterRef.current?.output as any;

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
