import { useContext, useEffect, useRef, useState } from 'react';

import {
	IModule,
	IModuleState,
	ModuleType as Type,
} from '../../state/types/module';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { useEffectOnce } from './use-effect-once';

const initializedNodes = new Set<string>();

export const useNode = <NodeType, ModuleType extends Type>(
	module: IModule,
	moduleInit: (
		node: NodeType,
		state?: IModuleState[ModuleType],
	) => IModuleState[ModuleType],
	nodeFactory: () => NodeType,
) => {
	const nodeRef = useRef<NodeType>(undefined);

	if (!nodeRef.current) {
		if (!initializedNodes.has(module.moduleKey)) {
			initializedNodes.add(module.moduleKey);
		} else {
			console.error('re-initializing an existing audio node');
			debugger;
		}
		nodeRef.current = nodeFactory();
	}

	// Though React calls all effects twice because of a "dummy cycle" in dev mode,
	// we need to use some special tricks to prevent actually disconnecting the
	// audio node during the dummy cycle.
	useEffectOnce(() => () => {
		if (
			nodeRef.current &&
			typeof nodeRef.current === 'object' &&
			'disconnect' in nodeRef.current &&
			typeof nodeRef.current.disconnect === 'function'
		) {
			nodeRef.current.disconnect();
			nodeRef.current = undefined;
		}
	});

	const [state, setState] = useState(() =>
		moduleInit(
			nodeRef.current as NodeType,
			module.state as IModuleState[ModuleType],
		),
	);

	const { dispatch } = useContext(PatchContext);

	useEffect(() => {
		if (state) {
			dispatch(patchActions.updateModuleAction(module.moduleKey, { state }));
		}
	}, [dispatch, module.moduleKey, state]);

	return {
		node: nodeRef.current,
		state,
		setState,
	};
};
