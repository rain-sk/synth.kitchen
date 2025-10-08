import React, { useCallback, useEffect, useRef } from 'react';
import {
	IAudioContext,
	IDynamicsCompressorNode,
} from 'standardized-audio-context';

import { audioContext } from '../../audio';

import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import {
	CLOCK_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';

const compressorStateFromNode = (
	node: IDynamicsCompressorNode<IAudioContext>,
): ModuleState['COMPRESSOR'] => ({
	version: CLOCK_STATE_VERSIONS[0],
	attack: parseFloat(Number(node.attack.value).toPrecision(8)),
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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.threshold !== node.threshold.value) {
			commitThresholdChange(module.state.threshold);
		}
		if (module.state.knee !== node.knee.value) {
			commitKneeChange(module.state.knee);
		}
		if (module.state.ratio !== node.ratio.value) {
			commitRatioChange(module.state.ratio);
		}
		if (module.state.attack !== node.attack.value) {
			commitAttackChange(module.state.attack);
		}
		if (module.state.release !== node.release.value) {
			commitReleaseChange(module.state.release);
		}
	}, [
		module.state,
		commitThresholdChange,
		commitKneeChange,
		commitRatioChange,
		commitAttackChange,
		commitReleaseChange,
	]);

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
					paramAccessor={thresholdAccessor}
					name="threshold"
					value={state.threshold}
					commitValueCallback={commitThresholdChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={kneeAccessor}
					name="knee"
					value={state.knee}
					commitValueCallback={commitKneeChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={ratioAccessor}
					name="ratio"
					value={state.ratio}
					commitValueCallback={commitRatioChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={attackAccessor}
					name="attack"
					value={state.attack}
					commitValueCallback={commitAttackChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={releaseAccessor}
					name="release"
					value={state.release}
					commitValueCallback={commitReleaseChange}
				/>
			</section>
		</>
	) : null;
};
