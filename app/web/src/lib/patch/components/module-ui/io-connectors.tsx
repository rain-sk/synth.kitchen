import React from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';

import { IoConnector } from './io-connector';
import { IoType } from 'synth.kitchen-shared';

const Connector =
	(type: IoType) =>
	({
		moduleId,
		accessor,
		channel,
		name,
	}: {
		channel: number;
		moduleId: string;
		accessor: () => IAudioNode<IAudioContext>;
		name: string;
	}) =>
		(
			<IoConnector
				moduleId={moduleId}
				accessor={accessor}
				type={type}
				channel={channel}
				name={name}
			/>
		);

const InputConnector = Connector(IoType.input);

const OutputConnector = Connector(IoType.output);

export const IoConnectors: React.FunctionComponent<{
	moduleId: string;
	inputAccessors: Record<string, () => IAudioNode<IAudioContext>>;
	outputAccessors: Record<string, () => IAudioNode<IAudioContext>>;
}> = ({ moduleId, inputAccessors, outputAccessors }) => {
	return (
		<section className="connectors">
			<h3 className="visually-hidden">Connectors</h3>
			<section className="inputs">
				<h4 className="visually-hidden">Inputs</h4>
				{Object.entries(inputAccessors).map(([key, accessor], i) => (
					<InputConnector
						moduleId={moduleId}
						accessor={accessor}
						channel={i}
						key={key}
						name={key}
					/>
				))}
			</section>
			<section className="outputs">
				<h4 className="visually-hidden">Outputs</h4>
				{Object.entries(outputAccessors).map(([key, accessor], i) => (
					<OutputConnector
						moduleId={moduleId}
						accessor={accessor}
						channel={i}
						key={key}
						name={key}
					/>
				))}
			</section>
		</section>
	);
};
