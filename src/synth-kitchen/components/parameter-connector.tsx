import React, { useEffect } from 'react';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { registerParameterAction } from '../state/actions/register-parameter';
import { IParameter } from '../state/types/parameter';
import { unregisterParameterAction } from '../state/actions/unregister-parameter';
import { updateParameterRegistrationAction } from '../state/actions/update-parameter-registration';

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

	return <button type="button">o</button>;
};
