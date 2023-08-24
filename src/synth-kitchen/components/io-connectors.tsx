import React from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IoConnector } from './io-connector';
import { IoType } from '../state/types/io';

export const IoConnectors: React.FunctionComponent<{
	moduleKey: string;
	inputAccessors: (() => IAudioNode<IAudioContext>)[];
	outputAccessors: (() => IAudioNode<IAudioContext>)[];
}> = ({ moduleKey, inputAccessors, outputAccessors }) => {
	return (
		<section className="connectors">
			<span>
				{inputAccessors.map((accessor, i) => (
					<IoConnector
						moduleKey={moduleKey}
						accessor={accessor}
						type={IoType.input}
						channel={i}
						key={i}
					/>
				))}
			</span>
			<span>
				{outputAccessors.map((accessor, i) => (
					<IoConnector
						moduleKey={moduleKey}
						accessor={accessor}
						type={IoType.output}
						channel={i}
						key={i}
					/>
				))}
			</span>
		</section>
	);
};
