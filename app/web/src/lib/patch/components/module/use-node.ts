import { useContext, useEffect, useMemo, useState } from 'react';

import {
	IModule,
	IModuleState,
	ModuleType as Type,
} from '../../state/types/module';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { useEffectOnce } from './use-effect-once';

export const useNode = <NodeType, ModuleType extends Type>(
	module: IModule,
	moduleInit: (
		node: NodeType,
		state?: IModuleState[ModuleType],
	) => IModuleState[ModuleType],
	nodeFactory: () => NodeType,
) => {
	const node = useMemo(nodeFactory, []);

	// Though React calls all effects twice because of a "dummy cycle" in dev mode,
	// we need to use some special tricks to prevent actually disconnecting the
	// audio node during the dummy cycle.
	useEffectOnce(() => () => {
		if (
			node &&
			typeof node === 'object' &&
			'disconnect' in node &&
			typeof node.disconnect === 'function'
		) {
			node.disconnect();
		}
	});

	const [state, setState] = useState(() =>
		moduleInit(node as NodeType, module.state as IModuleState[ModuleType]),
	);

	const { dispatch } = useContext(PatchContext);

	useEffect(() => {
		if (state) {
			dispatch(patchActions.updateModuleAction(module.moduleKey, { state }));
		}
	}, [dispatch, module.moduleKey, state]);

	return {
		node,
		state,
		setState,
	};
};
