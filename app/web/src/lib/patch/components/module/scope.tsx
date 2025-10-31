import React, { useCallback, useEffect } from 'react';
import { useAsync, useScroll } from 'react-use';
import {
	Module,
	ModuleState,
	ModuleType,
	SCOPE_STATE_VERSIONS,
} from 'synth.kitchen-shared';

import { ScopeNode } from '../../audio/nodes/scope';
import { IoConnectors } from '../module-ui/io-connectors';
import { useNode } from './use-node';
import {
	useRefBackedState,
	getMain,
	isInViewport,
} from '../../../shared/utils';

const initScope = (): ModuleState['SCOPE'] => ({
	version: SCOPE_STATE_VERSIONS[0],
});

export const ScopeModule: React.FC<{
	module: Module<ModuleType.SCOPE>;
}> = ({ module }) => {
	const { node, state } = useNode<ScopeNode, ModuleType.SCOPE>(
		module,
		initScope,
		() => new ScopeNode(),
	);

	const [_, canvas, setCanvas] = useRefBackedState<HTMLElement | null>(null);
	const main = useAsync(getMain);
	const scroll = useScroll({ current: main.value as any });
	useEffect(() => {
		if (!canvas || !node) {
			return;
		}
		if (isInViewport(canvas)) {
			node.start();
		} else {
			node.pause();
		}
	}, [canvas, scroll]);

	const enabled = state != undefined;

	const input = useCallback(() => node.input(), [enabled]);

	const output = useCallback(() => node.output(), [enabled]);

	useEffect(() => {
		if (canvas) {
			node.init(canvas);
		}
	}, [canvas]);

	return enabled ? (
		<>
			<canvas ref={setCanvas} />
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>
		</>
	) : (
		<p>loading...</p>
	);
};
