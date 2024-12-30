import React, { useEffect, useRef, useState } from 'react';
import { actions } from '../state/actions';
import { IModule, IModuleState, ModuleType } from '../state/types/module';
import { useDispatchContext } from './use-dispatch-context';
import { useEffectOnce } from './use-effect-once';

const disconnectRef = <NodeType>(
	ref: React.MutableRefObject<NodeType | undefined>,
) => {
	if (ref.current && typeof ref.current === 'object') {
		if ('stop' in ref.current && typeof ref.current.stop === 'function') {
			ref.current.stop();
		} else if (
			'disconnect' in ref.current &&
			typeof ref.current.disconnect === 'function'
		) {
			ref.current.disconnect();
		}
	}
};

export const useModuleState = <T extends ModuleType, NodeType>(
	module: IModule,
	init: (
		ref: React.MutableRefObject<NodeType | undefined>,
	) => () => IModuleState[T],
	cleanup?: () => void,
): [
	React.MutableRefObject<NodeType | undefined>,
	IModuleState[T],
	React.Dispatch<React.SetStateAction<IModuleState[T]>>,
] => {
	const ref = useRef<NodeType>();
	const [state, setState] = useState(init(ref));

	useEffectOnce(() => () => {
		disconnectRef(ref);
		if (cleanup) {
			cleanup();
		}
	});

	const dispatch = useDispatchContext();

	useEffect(() => {
		if (state) {
			dispatch(actions.updateModuleAction(module.moduleKey, { state }));
		}
	}, [dispatch, module.moduleKey, state]);

	return [ref, state, setState];
};
