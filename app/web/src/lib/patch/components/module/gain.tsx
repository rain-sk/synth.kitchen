import React, { useCallback } from 'react';
import { IAudioContext, IGainNode } from 'standardized-audio-context';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const gainStateFromNode = (
	node: IGainNode<IAudioContext>,
): ModuleState['GAIN'] => ({
	version: '0.5.0',
	gain: node.gain.value,
});

const initGain = (
	gain: IGainNode<IAudioContext>,
	state?: ModuleState['GAIN'],
) => {
	if (state) {
		gain.gain.setValueAtTime(state.gain, audioContext.currentTime);
		return state;
	} else {
		return gainStateFromNode(gain);
	}
};

export const GainModule: React.FC<{ module: Module<ModuleType.GAIN> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<
		IGainNode<IAudioContext>,
		ModuleType.GAIN
	>(module, initGain, () => audioContext.createGain());

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
