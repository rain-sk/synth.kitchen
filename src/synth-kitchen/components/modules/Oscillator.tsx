import * as React from 'react';
import type { IModuleProps, IModule, IConnector } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { audio } from '../../io/audio-context';
import { Setting } from './shared/Setting';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/unique-id';

// this typically would come from node_modules
// contributors publish their modules on npm or github
// and are brought into the platform with npm install
import OscillatorModule from '../../../modules/oscillator';

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

type Params = IConnector[];

type ModuleState = {
	module: IModule;
	params: Params;
	unit: any;
};

//  This module loader takes care of dynamically instantiating the modules
const ModuleLoader: React.FunctionComponent<IModuleProps> = (props) => {
	// ModuleLoader state
	const [state, setState] = React.useState({
		module: {},
		params: [] as Params,
		unit: {}
	} as ModuleState);

	// UIState
	const [uiState, setUIState] = React.useState({} as Record<string, any>);
	// ModuleLoader values
	const { params, unit } = state;

	// Build the module only on first render pass
	React.useEffect(() => {
		const module = modules.get(props.moduleKey);

		if (module && audio) {
			const unit = new OscillatorModule();
			// hydrate static params
			const params: Params = unit.getParameters().map(
				(param) =>
					({
						...defaultParam,
						...param,
						id: uniqueId(),
						getter: () =>
							param.type === 'SIGNAL_OUT' ? unit.node : uiState[param.name]
					} as any)
			);

			// init UI based on default values
			const initialState = params.reduce(
				(initial, { name, defaultValue }: any) => {
					return defaultValue !== undefined
						? { ...{ ...initial, [name]: defaultValue } }
						: initial;
				},
				{}
			);

			module.node = unit.setup(audio);
			module.connectors = params;

			setState({ ...state, module, params, unit });
			setUIState(initialState);
		}
	}, []);

	// update UIstate and pass it to the unit
	const update = React.useCallback(
		(key: string) => (value: string | number) => {
			const newState = { ...uiState, [key]: value };
			unit.update(newState);
			setUIState(newState);
		},
		[uiState]
	);

	return unit.render && params ? (
		unit.render({ params, state: uiState, update, moduleKey: props.moduleKey })
	) : (
		<>
			<h2 className="visually-hidden">{unit.name}</h2>
			{params.map((param: any) => {
				//  dynamically render UI based on unit parameter descriptors
				const componentProps = {
					id: param.id,
					connectorId: param.id,
					key: param.id,
					name: param.name,
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
		</>
	);
};

//  keep export name for compat
export const Oscillator = ModuleLoader;
