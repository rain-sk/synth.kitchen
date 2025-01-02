import React, { useCallback } from 'react';
import { IAudioContext, IStereoPannerNode } from 'standardized-audio-context';

import { audioContext } from '../../../audio/context';

import { IModule, IModuleState } from '../../../state/types/module';
import { IoConnectors } from '../module-components/io-connectors';
import { NumberParameter } from '../module-components/number-parameter';
import { useNode } from '../../../hooks/use-node';

const panStateFromNode = (
	node: IStereoPannerNode<IAudioContext>,
): IModuleState['PAN'] => ({
	pan: node.pan.value,
});

const initPan = (
	pan: IStereoPannerNode<IAudioContext>,
	state?: IModuleState['PAN'],
) => {
	if (state) {
		pan.pan.setValueAtTime(state.pan, audioContext.currentTime);
		return state;
	} else {
		return panStateFromNode(pan);
	}
};

export const PanModule: React.FC<{ module: IModule<'PAN'> }> = ({ module }) => {
	const { node, state, setState } = useNode<
		IStereoPannerNode<IAudioContext>,
		'PAN'
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
				moduleKey={module.moduleKey}
				inputAccessors={{ input }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={panAccessor}
					name="pan"
					value={state.pan}
					commitValueCallback={commitPanChange}
				/>
			</section>
		</>
	) : null;
};
