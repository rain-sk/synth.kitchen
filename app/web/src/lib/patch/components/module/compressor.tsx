import React, { useCallback } from 'react';
import {
	IAudioContext,
	IDynamicsCompressorNode,
} from 'standardized-audio-context';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const compressorStateFromNode = (
	node: IDynamicsCompressorNode<IAudioContext>,
): ModuleState['COMPRESSOR'] => ({
	version: '0.5.0',
	attack: node.attack.value,
	knee: node.knee.value,
	ratio: node.ratio.value,
	release: node.release.value,
	threshold: node.threshold.value,
});

const initCompressor = (
	compressor: IDynamicsCompressorNode<IAudioContext>,
	state?: ModuleState['COMPRESSOR'],
) => {
	if (state) {
		compressor.attack.setValueAtTime(state.attack, audioContext.currentTime);
		compressor.knee.setValueAtTime(state.knee, audioContext.currentTime);
		compressor.ratio.setValueAtTime(state.ratio, audioContext.currentTime);
		compressor.release.setValueAtTime(state.release, audioContext.currentTime);
		compressor.threshold.setValueAtTime(
			state.threshold,
			audioContext.currentTime,
		);
		return state;
	} else {
		return compressorStateFromNode(compressor);
	}
};

export const CompressorModule: React.FC<{
	module: Module<ModuleType.COMPRESSOR>;
}> = ({ module }) => {
	const { node, state, setState } = useNode<
		IDynamicsCompressorNode<IAudioContext>,
		ModuleType.COMPRESSOR
	>(module, initCompressor, () => audioContext.createDynamicsCompressor());

	const enabled = state !== undefined;

	const input = useCallback(() => node, [enabled]);

	const output = useCallback(() => node, [enabled]);

	const commitThresholdChange = useCallback(
		(threshold: number) => {
			node.threshold.linearRampToValueAtTime(
				threshold,
				audioContext.currentTime,
			);
			setState({
				...state,
				threshold,
			});
		},
		[state],
	);

	const thresholdAccessor = useCallback(() => node.threshold, [enabled]);

	const commitKneeChange = useCallback(
		(knee: number) => {
			node.knee.linearRampToValueAtTime(knee, audioContext.currentTime);
			setState({
				...state,
				knee,
			});
		},
		[state],
	);

	const kneeAccessor = useCallback(() => node.knee, [enabled]);

	const commitRatioChange = useCallback(
		(ratio: number) => {
			node.ratio.linearRampToValueAtTime(ratio, audioContext.currentTime);
			setState({
				...state,
				ratio,
			});
		},
		[state],
	);

	const ratioAccessor = useCallback(() => node.ratio, [enabled]);

	const commitAttackChange = useCallback(
		(attack: number) => {
			node.attack.linearRampToValueAtTime(attack, audioContext.currentTime);
			setState({
				...state,
				attack,
			});
		},
		[state],
	);

	const attackAccessor = useCallback(() => node.attack, [enabled]);

	const commitReleaseChange = useCallback(
		(release: number) => {
			node.release.linearRampToValueAtTime(release, audioContext.currentTime);
			setState({
				...state,
				release,
			});
		},
		[state],
	);

	const releaseAccessor = useCallback(() => node.release, [enabled]);

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
					paramAccessor={thresholdAccessor}
					name="threshold"
					value={state.threshold}
					commitValueCallback={commitThresholdChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={kneeAccessor}
					name="knee"
					value={state.knee}
					commitValueCallback={commitKneeChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={ratioAccessor}
					name="ratio"
					value={state.ratio}
					commitValueCallback={commitRatioChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={attackAccessor}
					name="attack"
					value={state.attack}
					commitValueCallback={commitAttackChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={releaseAccessor}
					name="release"
					value={state.release}
					commitValueCallback={commitReleaseChange}
				/>
			</section>
		</>
	) : null;
};
