import React, { useCallback } from 'react';

import { IAudioContext, IStereoPannerNode } from 'standardized-audio-context';
import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';

const panStateFromNode = (
	node: IStereoPannerNode<IAudioContext>,
): IModuleState['PAN'] => ({
	pan: node.pan.value,
});

const initPan = (
	panRef: React.MutableRefObject<IStereoPannerNode<IAudioContext> | undefined>,
	state?: IModuleState['PAN'],
) => {
	panRef.current = audioContext.createStereoPanner();
	if (state) {
		panRef.current.pan.setValueAtTime(state.pan, audioContext.currentTime);
		return state;
	} else {
		return panStateFromNode(panRef.current);
	}
};

export const PanModule: React.FC<{ module: IModule<'PAN'> }> = ({ module }) => {
	const [panRef, state, setState] = useModuleState<
		'PAN',
		IStereoPannerNode<IAudioContext>
	>(module, (ref) => () => initPan(ref, module.state));

	const enabled = state != undefined;

	const input = useCallback(() => panRef.current as any, [enabled]);

	const output = useCallback(() => panRef.current as any, [enabled]);

	const commitPanChange = useCallback(
		(pan: number) => {
			panRef.current?.pan.linearRampToValueAtTime(
				pan,
				audioContext.currentTime,
			);
			setState({
				...state,
				pan,
			});
		},
		[audioContext, state],
	);

	const panAccessor = useCallback(() => panRef.current?.pan as any, [enabled]);

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
