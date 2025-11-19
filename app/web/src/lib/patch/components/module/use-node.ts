import isCallable from 'is-callable';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Module, ModuleState, ModuleType as Type } from 'synth.kitchen-shared';

import { PatchContext } from '../../contexts/patch';
import { patchActions } from '../../state/actions';
import { useEffectOnce } from './use-effect-once';

const nodeMap = new Map<string, any>();

export const useNode = <NodeType extends Object, ModuleType extends Type>(
	module: Module,
	moduleInit: (
		node: NodeType,
		state?: ModuleState[ModuleType],
	) => ModuleState[ModuleType],
	nodeFactory: () => NodeType,
) => {
	const { current: id } = useRef(module.id);
	const node = useMemo(
		nodeMap.has(id) ? () => nodeMap.get(id) as NodeType : nodeFactory,
		[],
	);
	if (!nodeMap.has(id)) {
		nodeMap.set(id, node);
	}

	// React runs all effects twice on mount because of a "dummy cycle"
	// in dev mode, so use some special tricks to prevent actually
	// disconnecting the audio node during the dummy cycle.
	useEffectOnce(() => () => {
		if (
			node &&
			nodeMap.has(id) &&
			'disconnect' in node &&
			isCallable(node.disconnect)
		) {
			try {
				nodeMap.delete(id);
				node.disconnect();
			} catch (e) {
				console.warn(e);
			}
		}
	});

	const [state, setState] = useState(() =>
		moduleInit(node as NodeType, module.state as ModuleState[ModuleType]),
	);

	const { dispatch } = useContext(PatchContext);

	useEffect(() => {
		if (state) {
			dispatch(patchActions.updateModuleStateAction(id, state));
		}
	}, [dispatch, module.id, state]);

	return {
		node,
		state,
		setState,
	};
};
