import { IState } from '../types/state';
import { reducers } from '.';
import { actions } from '../actions';
import { IClickConnector } from '../actions/click-connector';
import { IIo, IoType, ioKey } from '../types/io';
import { IParameter, paramKey } from '../types/parameter';
import {
	IAudioContext,
	IAudioNode,
	IAudioParam
} from 'standardized-audio-context';

const validConnection = (
	io1: IIo | IParameter,
	io2: IIo | IParameter
):
	| [
			{ key: string; accessor: () => IAudioParam | IAudioNode<IAudioContext> },
			{ key: string; accessor: () => IAudioNode<IAudioContext> }
	  ]
	| undefined => {
	const io1IsParam = 'name' in io1;
	const io2IsParam = 'name' in io2;

	if (io1IsParam && io2IsParam) {
		return;
	}

	const io1IsOutput = 'type' in io1 && io1.type === IoType.output;
	const io1IsInput = !io1IsOutput;

	const io2IsOutput = 'type' in io2 && io2.type === IoType.output;
	const io2IsInput = !io2IsOutput;

	return io1IsInput !== io2IsInput && (io1IsOutput || io2IsOutput)
		? [
				io1IsInput
					? {
							key: io1IsParam ? paramKey(io1) : ioKey(io1),
							accessor: io1.accessor
					  }
					: {
							key: io2IsParam ? paramKey(io2) : ioKey(io2),
							accessor: io2.accessor
					  },
				io1IsOutput
					? {
							key: ioKey(io1),
							accessor: io1.accessor
					  }
					: {
							key: ioKey(io2 as IIo),
							accessor: io2.accessor as () => IAudioNode<IAudioContext>
					  }
		  ]
		: undefined;
};

export const clickConnector: React.Reducer<IState, IClickConnector> = (
	state,
	{ payload }
) => {
	state = reducers.history(state, actions.historyPushAction());

	const clickedIo = 'type' in payload;

	const key = clickedIo ? ioKey(payload) : paramKey(payload);

	if (!state.activeConnector) {
		return {
			...state,
			activeConnector: clickedIo
				? {
						io: key
				  }
				: {
						param: key
				  }
		};
	}

	const clickedConnectorWithKey = clickedIo
		? {
				...state.io[key],
				key
		  }
		: { ...state.parameters[key], key };

	const activeConnectorWithKey =
		'io' in state.activeConnector
			? {
					...state.io[state.activeConnector.io],
					key: state.activeConnector.io
			  }
			: {
					...state.parameters[state.activeConnector.param],
					key: state.activeConnector.param
			  };

	if (clickedConnectorWithKey.key === activeConnectorWithKey.key) {
		return { ...state, activeConnector: undefined };
	}

	const connection = activeConnectorWithKey
		? validConnection(clickedConnectorWithKey, activeConnectorWithKey)
		: undefined;

	if (!connection) {
		return {
			...state,
			activeConnector: undefined
		};
	}

	if (connection) {
		const [input, output] = connection;

		const connectionKey = `${input.key}_${output.key}`;

		if (connectionKey in state.connections) {
			try {
				output.accessor().disconnect(input.accessor() as any);
			} catch (e) {
				console.error(e);
			}

			return {
				...state,
				activeConnector: undefined,
				connections: Object.fromEntries(
					Object.entries(state.connections).filter(
						(entry) => entry[0] !== connectionKey
					)
				)
			};
		} else {
			output.accessor().connect(input.accessor() as any);

			return {
				...state,
				activeConnector: undefined,
				connections: {
					...state.connections,
					[connectionKey]: true
				}
			};
		}
	}

	return state;
};
