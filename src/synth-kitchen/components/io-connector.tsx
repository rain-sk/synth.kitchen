import React, { useEffect } from 'react';

import { useEffectOnce } from '../hooks/use-effect-once';
import { useDispatchContext } from '../hooks/use-dispatch-context';

import {
	updateInputRegistrationAction,
	updateOutputRegistrationAction
} from '../state/actions/update-io-registration';
import {
	registerInputAction,
	registerOutputAction
} from '../state/actions/register-io';
import {
	unregisterInputAction,
	unregisterOutputAction
} from '../state/actions/unregister-io';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';

export const InputConnector: React.FunctionComponent<{
	moduleKey: string;
	channel: number;
	accessor: () => IAudioNode<IAudioContext>;
}> = ({ moduleKey, channel, accessor }) => {
	const dispatch = useDispatchContext();

	useEffectOnce(() => {
		dispatch(registerInputAction(moduleKey, channel, accessor));

		return () => {
			dispatch(unregisterInputAction(moduleKey, channel));
		};
	});

	useEffect(() => {
		dispatch(updateInputRegistrationAction(moduleKey, channel, accessor));
	}, [channel, accessor]);

	return <button type="button">o</button>;
};

export const OutputConnector: React.FunctionComponent<{
	moduleKey: string;
	channel: number;
	accessor: () => IAudioNode<IAudioContext>;
}> = ({ moduleKey, channel, accessor }) => {
	const dispatch = useDispatchContext();

	useEffectOnce(() => {
		dispatch(registerOutputAction(moduleKey, channel, accessor));

		return () => {
			dispatch(unregisterOutputAction(moduleKey, channel));
		};
	});

	useEffect(() => {
		dispatch(updateOutputRegistrationAction(moduleKey, channel, accessor));
	}, [channel, accessor]);

	return <button type="button">o</button>;
};
