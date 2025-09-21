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
	const { activeConnectorIsOutput, connectedToActiveConnector } = useContext(
		DerivedConnectionStateContext,
	);
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

	return (
		<button
			aria-label={name}
			aria-roledescription="parameter connector"
			id={connectorKey}
			type="button"
			onClick={onClick}
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
