import * as React from 'react';
import { audio } from '../../io/audio-context';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/unique-id';

export const Gain: React.FunctionComponent<IModuleProps> = props => {
	const [inputId] = React.useState(uniqueId() as any);
	const [outputId] = React.useState(uniqueId() as any);
	const [gainId] = React.useState(uniqueId() as any);
	const [gain, setGain] = React.useState(0.5);

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = audio.node(audio.createGain());
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
				id: gainId,
				name: 'gain',
				type: 'CV_IN',
				getter: () => module.node.gain
			}
		]
		setGain(module.node.gain.value);
	}

	const handleChangeGain = React.useCallback((newGain: number) => {
		(module as any).node.gain.value = newGain;
		setGain(newGain);
	}, [module]);

	return (
		<>
			<h2 className="visually-hidden">gain</h2>
			<Connector
				type="SIGNAL_IN"
				name="input"
				moduleKey={props.moduleKey}
				connectorId={inputId} />
			<Parameter
				name="gain"
				moduleKey={props.moduleKey}
				id={gainId}
				value={gain}
				scale={s => s}
				display={d => d}
				onChange={handleChangeGain}
				type={'CV_IN'} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</>
	);
};
