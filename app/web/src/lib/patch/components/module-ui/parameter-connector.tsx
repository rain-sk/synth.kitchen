import React, { useContext, useEffect, useMemo, useState } from 'react';

import { PatchContext } from '../../contexts/patch';
import { patchActions } from '../../state/actions';
import { DerivedConnectionStateContext } from '../../contexts/derived-connection-state';
import { Parameter, paramKey } from 'synth.kitchen-shared';

export const ParameterConnector: React.FunctionComponent<Parameter> = ({
	moduleId,
	name,
	accessor,
}) => {
	const [connectorKey] = useState(() => paramKey({ moduleId, name }));

	const { activeConnectorKey, dispatch } = useContext(PatchContext);
	const {
		activeConnectorIsOutput,
		connectedToActiveConnector,
		pluggedConnectorKeys,
	} = useContext(DerivedConnectionStateContext);
	const highlightInputs = activeConnectorIsOutput;
	const isConnectedToActiveConnector = useMemo(
		() => connectedToActiveConnector.has(connectorKey),
		[connectedToActiveConnector],
	);

	useEffect(() => {
		dispatch(
			patchActions.registerConnectorAction({
				moduleId,
				name,
				accessor,
			}),
		);
	}, []);

	const onClick = () => {
		dispatch(patchActions.clickConnectorAction({ moduleId, name, accessor }));
	};

	const isActive = activeConnectorKey === connectorKey;
	const highlight = highlightInputs;
	const isPlugged = pluggedConnectorKeys.has(connectorKey);
	const quiet = !isPlugged;
	const live = activeConnectorIsOutput && isConnectedToActiveConnector;

	return (
		<button
			aria-label={name}
			aria-roledescription="parameter connector"
			id={connectorKey}
			type="button"
			onClick={onClick}
			data-direction="input"
			data-quiet={String(quiet)}
			data-live={String(live)}
			data-plugged={isPlugged ? 'true' : 'false'}
			className={`connector ${
				isActive
					? 'active'
					: isConnectedToActiveConnector
					? 'connected'
					: highlight
					? 'highlight'
					: ''
			}`}
		/>
	);
};
