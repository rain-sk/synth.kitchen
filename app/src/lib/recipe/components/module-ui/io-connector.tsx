import { useContext, useEffect, useMemo, useState } from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';

import { IoType, ioKey } from '../../state/types/connection';
import { RecipeContext } from '../../contexts/recipe';
import { recipeActions } from '../../state/actions';
import { DerivedConnectionStateContext } from '../../contexts/derived-connection-state';

export const IoConnector = <Type extends IoType>({
	name,
	moduleKey,
	type,
	channel,
	accessor,
}: {
	name: string;
	moduleKey: string;
	channel: number;
	type: Type;
	accessor: () => IAudioNode<IAudioContext>;
}) => {
	const [connectorKey] = useState(() => ioKey({ moduleKey, channel, type }));

	const { activeConnectorKey, dispatch } = useContext(RecipeContext);
	const {
		activeConnectorIsInput,
		activeConnectorIsOutput,
		connectedToActiveConnector,
	} = useContext(DerivedConnectionStateContext);
	const highlightOutputs = activeConnectorIsInput;
	const highlightInputs = activeConnectorIsOutput;
	const isConnectedToActiveConnector = useMemo(
		() => connectedToActiveConnector.has(connectorKey),
		[connectedToActiveConnector],
	);

	useEffect(() => {
		dispatch(
			recipeActions.registerConnectorAction({
				moduleKey,
				channel,
				type,
				accessor,
			}),
		);
	}, []);

	const onClick = () => {
		dispatch(
			recipeActions.clickConnectorAction({
				moduleKey,
				type,
				channel,
				accessor,
			}),
		);
	};

	const isInput = type === IoType.input;
	const isActive = activeConnectorKey === connectorKey;

	const highlight = !isActive && (isInput ? highlightInputs : highlightOutputs);

	const roleDescription = useMemo(
		() => `${isInput ? 'input' : 'output'} connector`,
		[isInput],
	);

	return (
		<span className="io">
			{!isInput && <p>{name}</p>}
			<button
				aria-label={name}
				aria-roledescription={roleDescription}
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
			{isInput && <p>{name}</p>}
		</span>
	);
};
