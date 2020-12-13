import * as React from 'react';
import type { IModuleProps, IModule, IConnector } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { audio } from '../../io/audio-context';
import { Setting } from './shared/Setting';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/unique-id';

import {
	weaves,
	oscillatorTypes,
	params
} from '@vectorsize/weaves-oscillators';

import type { Param } from '@vectorsize/weaves-oscillators';

const oscillatorTypeOptions: [
	string,
	string
][] = oscillatorTypes.map((type: string, id: number) => [`${id}`, type]);

const unity = (d: any) => d;
// default parameter initialization
// to allow some optional values
const defaultParam = {
	min: 0,
	max: 1,
	scale: unity,
	display: unity,
	type: 'CV_IN'
};

type Connectors = IConnector[];

type ModuleState = {
	module: IModule;
	connectors: Connectors;
	unit: any;
	engine: number;
};

const scalers: Record<string, (v: number) => void> = {
	note: (v: number) => v * 127
};

const initialValues: Record<string, number> = {
	note: 70
};

const hideParams = ['engine', 'decay', 'frequencyModulationAmount'];
const outputId = uniqueId();

export const WeavesOscillator: React.FunctionComponent<IModuleProps> = (
	props: IModuleProps
) => {
	// ModuleLoader state
	const [state, setState] = React.useState({
		module: {},
		unit: {},
		connectors: [] as Connectors
	} as ModuleState);

	// UIState
	const [uiState, setUIState] = React.useState({} as Record<string, any>);
	// ModuleLoader values
	const { unit, connectors } = state;

	// Build the module only on first render pass
	React.useEffect(() => {
		const init = async () => {
			const module = modules.get(props.moduleKey);

			if (module && audio) {
				const unit = await weaves.createOscillator(audio.context as any);

				// hydrate static params
				const connectors: Connectors = params
					.filter((p: Param) => p.name.indexOf('mod') < 0)
					.map(
						(param: any) =>
							({
								...defaultParam,
								...param,
								scale: scalers[param.name] ? scalers[param.name] : unity,
								id: uniqueId(),
								getter: () => {
									return unit[`${param.name}AudioParameter`];
								}
							} as IConnector)
					)
					.concat([
						{
							id: outputId,
							name: 'output',
							type: 'SIGNAL_OUT',
							getter: () => unit
						}
					]);

				// init UI based on default values
				const initialState = params.reduce(
					(initial, { name, defaultValue }) => {
						const value: number = initialValues[name]
							? initialValues[name]
							: defaultValue !== undefined
							? defaultValue
							: initial[name];
						// initialize engine
						unit[name] = value;
						return { ...{ ...initial, [name]: value } };
					},
					{} as Record<string, number>
				);

				module.node = unit;
				module.connectors = connectors;
				module.node.start();

				setState({ ...state, module, connectors, unit });
				setUIState(initialState);
			}
		};
		init();
	}, []);

	// update UIstate and pass it to the unit
	const update = React.useCallback(
		(key: string) => (value: string | number) => {
			const newState = { ...uiState, [key]: value };
			unit[key] = value;
			setUIState(newState);
		},
		[uiState]
	);

	return (
		<>
			<h2 className="visually-hidden">{unit.name}</h2>
			{connectors &&
				connectors
					.filter((p: IConnector) => hideParams.indexOf(p.name) < 0)
					.map((param: any) => {
						//  dynamically render UI based on unit parameter descriptors
						const componentProps = {
							id: param.id,
							connectorId: param.id,
							key: param.id,
							name:
								param.name === 'frequencyModulationAmount'
									? 'FM Amt'
									: param.name,
							scale: param.scale,
							display: param.display,
							min: param.min,
							max: param.max,
							type: param.type,
							options: param.options,
							moduleKey: props.moduleKey,
							onChange: update(param.name),
							getter: () => uiState[param.name],
							value: uiState[param.name]
						};

						switch (param.type) {
							case 'CV_IN':
								return <Parameter {...componentProps} />;
							case 'SIGNAL_OUT':
								return <Connector {...componentProps} />;
							case 'SETTINGS':
								return <Setting {...{ ...componentProps, type: 'select' }} />;
							default:
								return null;
						}
					})}
			<Setting
				type="select"
				name="type"
				value={`${uiState.engine}`}
				options={oscillatorTypeOptions}
				onChange={update('engine')}
			/>
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId}
			/>
		</>
	);
};
