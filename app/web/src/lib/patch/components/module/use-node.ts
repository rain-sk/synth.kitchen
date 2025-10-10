import { useContext, useEffect, useMemo } from 'react';
import { Module, ModuleState, ModuleType as Type } from 'synth.kitchen-shared';

import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { useEffectOnce } from './use-effect-once';
import { useRefBackedState } from '../../../shared/utils/use-ref-backed-state';

export const useNode = <NodeType, ModuleType extends Type>(
	module: Module,
	moduleInit: (
		node: NodeType,
		state?: ModuleState[ModuleType],
	) => ModuleState[ModuleType],
	nodeFactory: () => NodeType,
) => {
	const node = useMemo(nodeFactory, []);

	// React runs all effects twice on mount because of a "dummy cycle"
	// in dev mode, use some special tricks to prevent actually
	// disconnecting the audio node during the dummy cycle.
	useEffectOnce(() => () => {
		if (
			node &&
			typeof node === 'object' &&
			'disconnect' in node &&
			typeof node.disconnect === 'function'
		) {
			try {
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
			dispatch(patchActions.updateModuleStateAction(module.id, state));
		}
	}, [dispatch, module.id, state]);

	return {
		node,
		state,
		setState,
	};
};
