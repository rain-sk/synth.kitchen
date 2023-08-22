import React, { useCallback, useEffect } from 'react';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { registerParameterAction } from '../state/actions/register-parameter';
import { IParameter } from '../state/types/parameter';
import { unregisterParameterAction } from '../state/actions/unregister-parameter';
import { updateParameterRegistrationAction } from '../state/actions/update-parameter-registration';
import { clickParamAction } from '../state/actions/click-connector';

export const ParameterConnector: React.FunctionComponent<IParameter> = ({
	moduleKey,
	name,
	accessor
}) => {
	const dispatch = useDispatchContext();

	useEffectOnce(() => {
		dispatch(registerParameterAction(moduleKey, name, accessor));

		return () => {
			dispatch(unregisterParameterAction(moduleKey, name));
		};
	});

	useEffect(() => {
		dispatch(updateParameterRegistrationAction(moduleKey, name, accessor));
	}, [accessor]);

	const onClick = useCallback(() => {
		dispatch(clickParamAction({ moduleKey, name }));
	}, [dispatch, clickParamAction, moduleKey, name]);

	return (
		<button type="button" onClick={onClick}>
			o
		</button>
	);
};
