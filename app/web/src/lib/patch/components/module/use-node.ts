import isCallable from 'is-callable';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { Module, ModuleState, ModuleType as Type } from 'synth.kitchen-shared';

import { PatchContext } from '../../contexts/patch';
import { patchActions } from '../../state/actions';
import { useRefBackedState } from '../../../shared/utils';
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
	const { loadEpoch } = useContext(PatchContext);
	// epoch-keyed so a LoadPatch remount never re-uses the node of the
	// generation being unmounted: its cleanup disconnects (nulls) that node
	const cacheKey = `${loadEpoch}:${id}`;
	const node = useMemo(
		nodeMap.has(cacheKey) ? () => nodeMap.get(cacheKey) as NodeType : nodeFactory,
		[],
	);
	if (!nodeMap.has(cacheKey)) {
		nodeMap.set(cacheKey, node);
	}

	// React runs all effects twice on mount because of a "dummy cycle"
	// in dev mode, so use some special tricks to prevent actually
	// disconnecting the audio node during the dummy cycle.
	useEffectOnce(() => () => {
		if (node && 'disconnect' in node && isCallable(node.disconnect)) {
			try {
				nodeMap.delete(cacheKey);
				node.disconnect();
			} catch (e) {
				console.warn(e);
			}
		}
	});

	const [_, state, setState] = useRefBackedState(() =>
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
