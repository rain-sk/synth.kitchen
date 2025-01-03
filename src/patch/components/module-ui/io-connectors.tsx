import React from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';

import { IoConnector } from './io-connector';
import { IoType } from '../../state/types/connection';

export const IoConnectors: React.FunctionComponent<{
	moduleKey: string;
	inputAccessors: Record<string, () => IAudioNode<IAudioContext>>;
	outputAccessors: Record<string, () => IAudioNode<IAudioContext>>;
}> = ({ moduleKey, inputAccessors, outputAccessors }) => {
	return (
		<section className="connectors">
			<h3 className="visually-hidden">Connectors</h3>
			<section className="inputs">
				<h4 className="visually-hidden">Inputs</h4>
				{Object.entries(inputAccessors).map(([key, accessor], i) => (
					<IoConnector
						moduleKey={moduleKey}
						accessor={accessor}
						type={IoType.input}
						channel={i}
						key={key}
						name={key}
					/>
				))}
			</section>
			<section className="outputs">
				<h4 className="visually-hidden">Outputs</h4>
				{Object.entries(outputAccessors).map(([key, accessor], i) => (
					<IoConnector
						moduleKey={moduleKey}
						accessor={accessor}
						type={IoType.output}
						channel={i}
						key={key}
						name={key}
					/>
				))}
			</section>
		</section>
	);
};
