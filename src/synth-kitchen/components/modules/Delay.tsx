import * as React from 'react';
import { audio } from '../../io/audio-context';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/unique-id';

export const Delay: React.FunctionComponent<IModuleProps> = props => {
	const [inputId] = React.useState(uniqueId() as any);
	const [outputId] = React.useState(uniqueId() as any);
	const [delayId] = React.useState(uniqueId() as any);
	const [delay, setDelay] = React.useState(0.5);

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = audio.node(audio.createDelay());
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
		<>
			<h2 className="visually-hidden">delay</h2>
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
				scale={s => s}
				display={d => d}
				onChange={handleChangeDelay}
				type={'CV_IN'}
				min={0}
				max={100} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</>
	);
};
