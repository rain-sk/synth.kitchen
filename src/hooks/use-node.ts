import { useEffect, useRef, useState } from 'react';
import {
	IModule,
	IModuleState,
	ModuleType as Type,
} from '../state/types/module';
import { patchActions } from '../state/actions';
import { usePatch } from './use-patch';

export const useNode = <NodeType, ModuleType extends Type>(
	module: IModule,
	moduleInit: (
		node: NodeType,
		state?: IModuleState[ModuleType],
	) => IModuleState[ModuleType],
	nodeFactory: () => NodeType,
) => {
	const nodeRef = useRef<NodeType>();
	if (!nodeRef.current) {
		nodeRef.current = nodeFactory();
	}

	const [state, setState] = useState(() =>
		moduleInit(
			nodeRef.current as NodeType,
			module.state as IModuleState[ModuleType],
		),
	);

	const { dispatch } = usePatch();

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
