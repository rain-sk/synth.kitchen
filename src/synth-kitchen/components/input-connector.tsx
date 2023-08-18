import React, { useEffect } from 'react';

import { useEffectOnce } from '../hooks/use-effect-once';
import { useDispatchContext } from '../hooks/use-dispatch-context';

import { IInput } from '../state/types/input';

import { updateInputRegistrationAction } from '../state/actions/update-input-registration';
import { registerInputAction } from '../state/actions/register-input';
import { unregisterInputAction } from '../state/actions/unregister-input';

export const ParameterConnector: React.FunctionComponent<IInput> = ({
	moduleKey,
	channel,
	accessor
}) => {
	const dispatch = useDispatchContext();

	useEffectOnce(() => {
		dispatch(registerInputAction(moduleKey, channel, accessor));

		return () => {
			dispatch(unregisterInputAction(moduleKey, channel));
		};
	});

	useEffect(() => {
		dispatch(updateInputRegistrationAction(moduleKey, channel, accessor));
	}, [accessor]);

	return <button type="button">o</button>;
};
