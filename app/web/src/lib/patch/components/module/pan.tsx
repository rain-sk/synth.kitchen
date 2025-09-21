import React, { useCallback } from 'react';
import { IAudioContext, IStereoPannerNode } from 'standardized-audio-context';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const panStateFromNode = (
	node: IStereoPannerNode<IAudioContext>,
): ModuleState['PAN'] => ({
	version: '0.5.0',
	pan: node.pan.value,
});

const initPan = (
	pan: IStereoPannerNode<IAudioContext>,
	state?: ModuleState['PAN'],
) => {
	if (state) {
		pan.pan.setValueAtTime(state.pan, audioContext.currentTime);
		return state;
	} else {
		return panStateFromNode(pan);
	}
};

export const PanModule: React.FC<{ module: Module<ModuleType.PAN> }> = ({
	module,
}) => {
	const { node, state, setState } = useNode<
		IStereoPannerNode<IAudioContext>,
		ModuleType.PAN
	>(module, initPan, () => audioContext.createStereoPanner());

	const enabled = state != undefined;

	const input = useCallback(() => node, [enabled]);

	const output = useCallback(() => node, [enabled]);

	const commitPanChange = useCallback(
		(pan: number) => {
			node.pan.linearRampToValueAtTime(pan, audioContext.currentTime);
			setState({
				...state,
				pan,
			});
		},
		[audioContext, state],
	);

	const panAccessor = useCallback(() => node.pan, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={panAccessor}
					name="pan"
					value={state.pan}
					commitValueCallback={commitPanChange}
				/>
			</section>
		</>
	) : null;
};
