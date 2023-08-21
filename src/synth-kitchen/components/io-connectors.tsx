import React from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { InputConnector, OutputConnector } from './io-connector';

export const IoConnectors: React.FunctionComponent<{
	moduleKey: string;
	inputAccessors: (() => IAudioNode<IAudioContext>)[];
	outputAccessors: (() => IAudioNode<IAudioContext>)[];
}> = ({ moduleKey, inputAccessors, outputAccessors }) => {
	return (
		<>
			{inputAccessors.map((accessor, i) => (
				<InputConnector
					moduleKey={moduleKey}
					accessor={accessor}
					channel={i}
					key={i}
				/>
			))}
			{outputAccessors.map((accessor, i) => (
				<OutputConnector
					moduleKey={moduleKey}
					accessor={accessor}
					channel={i}
					key={i}
				/>
			))}
		</>
	);
};
