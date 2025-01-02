import React, { useCallback } from 'react';
import { IAudioContext, IGainNode } from 'standardized-audio-context';

import { audioContext } from '../../audio/context';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../module-components/io-connectors';
import { NumberParameter } from '../module-components/number-parameter';
import { useNode } from './use-node';

const gainStateFromNode = (
	node: IGainNode<IAudioContext>,
): IModuleState['GAIN'] => ({
	gain: node.gain.value,
});

const initGain = (
	gain: IGainNode<IAudioContext>,
	state?: IModuleState['GAIN'],
) => {
	if (state) {
		gain.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return gainStateFromNode(gain);
	}
};

export const GainModule: React.FC<{ module: IModule<'GAIN'> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<IGainNode<IAudioContext>, 'GAIN'>(
		module,
		initGain,
		() => audioContext.createGain(),
	);

	const enabled = state !== undefined;

	const input = useCallback(() => node, [enabled]);

	const output = useCallback(() => node, [enabled]);

	const commitGainChange = useCallback(
		(gain: number) => {
			node.gain.linearRampToValueAtTime(gain, audioContext.currentTime);
			setState({
				...state,
				gain,
			});
		},
		[state],
	);

	const gainAccessor = useCallback(() => node.gain, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={gainAccessor}
					name="gain"
					value={state.gain}
					commitValueCallback={commitGainChange}
				/>
			</section>
		</>
	) : null;
};
