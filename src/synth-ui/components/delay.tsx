import * as React from 'react';
import { audioContext } from '../audio/audio-context';
import { IModuleProps } from './module';
import { modules } from './module-map';
import { Parameter } from './parameter';
import { Connector } from './connector';

const { v4 } = require('uuid');

const scaleDelay = (normalizedValue: number): number => {
	return Math.min(100, Math.max(0, normalizedValue * 100));
}

const displayDelay = (currentValue: number) => {
	return Math.round(currentValue * 100) / 100;
}

export const Delay: React.FunctionComponent<IModuleProps> = props => {
	const [inputId] = React.useState(v4() as any);
	const [outputId] = React.useState(v4() as any);
	const [delayId] = React.useState(v4() as any);
	const [delay, setDelay] = React.useState(0.5);

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = audioContext.createDelay();
		module.initialized = true;
		module.connectors = [
			{
				id: inputId,
				name: 'input',
				type: 'SIGNAL_IN',
				getter: () => module.node
			}, {
				id: outputId,
				name: 'output',
				type: 'SIGNAL_OUT',
				getter: () => module.node
			}, {
				id: delayId,
				name: 'delay',
				type: 'CV_IN',
				getter: () => module.node.delayTime
			}
		]
		setDelay(module.node.delayTime.value);
	}

	const handleChangeDelay = React.useCallback((newDelay: number) => {
		(module as any).node.delayTime.value = newDelay;
		setDelay(newDelay);
	}, [module]);

	return (
		<article>
			<h2>delay</h2>
			<Connector
				type="SIGNAL_IN"
				name="input"
				moduleKey={props.moduleKey}
				connectorId={inputId} />
			<Parameter
				name="delay"
				moduleKey={props.moduleKey}
				id={delayId}
				value={delay}
				scale={scaleDelay}
				display={displayDelay}
				onChange={handleChangeDelay}
				type={'CV_IN'} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</article>
	);
};
