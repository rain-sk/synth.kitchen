import React, { useCallback, useRef } from 'react';

import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { VcaNode } from '../../audio/nodes/vca';

const vcaStateFromNode = (node: VcaNode): IModuleState['VCA'] => ({
	attack: Math.round(node.attack.value * 100) / 100,
	decay: Math.round(node.decay.value * 100) / 100,
	sustain: Math.round(node.sustain.value * 100) / 100,
	release: Math.round(node.release.value * 100) / 100,
	peak: Math.round(node.peak.value * 100) / 100
});

const initVca = (
	vcaRef: React.MutableRefObject<VcaNode | undefined>,
	state?: IModuleState['VCA']
) => {
	vcaRef.current = new VcaNode();
	if (state) {
		vcaRef.current.attack.setValueAtTime(
			state.attack,
			audioContext.currentTime
		);
		vcaRef.current.decay.setValueAtTime(state.decay, audioContext.currentTime);
		vcaRef.current.sustain.setValueAtTime(
			state.sustain,
			audioContext.currentTime
		);
		vcaRef.current.release.setValueAtTime(
			state.release,
			audioContext.currentTime
		);
		vcaRef.current.peak.setValueAtTime(state.peak, audioContext.currentTime);
		return state;
	} else {
		return vcaStateFromNode(vcaRef.current);
	}
};

export const VcaModule: React.FC<{ module: IModule<'VCA'> }> = ({ module }) => {
	const vcaRef = useRef<VcaNode>();
	const [state, setState] = useModuleState<'VCA'>(
		() => initVca(vcaRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	const input = useCallback(() => vcaRef.current?.gain() as any, [enabled]);

	const gate = useCallback(
		() => vcaRef.current?.adsr().node() as any,
		[enabled]
	);

	const output = useCallback(() => vcaRef.current?.gain() as any, [enabled]);

	const commitAttackChange = useCallback(
		(attack: number) => {
			vcaRef.current?.attack.linearRampToValueAtTime(
				attack,
				audioContext.currentTime
			);
			setState({
				...state,
				attack
			});
		},
		[audioContext, state]
	);

	const attackAccessor = useCallback(
		() => vcaRef.current?.attack as any,
		[enabled]
	);

	const commitDecayChange = useCallback(
		(decay: number) => {
			vcaRef.current?.decay.linearRampToValueAtTime(
				decay,
				audioContext.currentTime
			);
			setState({
				...state,
				decay
			});
		},
		[audioContext, state]
	);

	const decayAccessor = useCallback(
		() => vcaRef.current?.decay as any,
		[enabled]
	);

	const commitSustainChange = useCallback(
		(sustain: number) => {
			vcaRef.current?.sustain.linearRampToValueAtTime(
				sustain,
				audioContext.currentTime
			);
			setState({
				...state,
				sustain
			});
		},
		[audioContext, state]
	);

	const sustainAccessor = useCallback(
		() => vcaRef.current?.sustain as any,
		[enabled]
	);

	const commitReleaseChange = useCallback(
		(release: number) => {
			vcaRef.current?.release.linearRampToValueAtTime(
				release,
				audioContext.currentTime
			);
			setState({
				...state,
				release
			});
		},
		[audioContext, state]
	);

	const releaseAccessor = useCallback(
		() => vcaRef.current?.release as any,
		[enabled]
	);

	const commitPeakChange = useCallback(
		(peak: number) => {
			vcaRef.current?.peak.linearRampToValueAtTime(
				peak,
				audioContext.currentTime
			);
			setState({
				...state,
				peak
			});
		},
		[audioContext, state]
	);

	const peakAccessor = useCallback(
		() => vcaRef.current?.peak as any,
		[enabled]
	);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ input, gate }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={attackAccessor}
					name="attack"
					value={state.attack}
					commitValueCallback={commitAttackChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={decayAccessor}
					name="decay"
					value={state.decay}
					commitValueCallback={commitDecayChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={sustainAccessor}
					name="sustain"
					value={state.sustain}
					commitValueCallback={commitSustainChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={releaseAccessor}
					name="release"
					value={state.release}
					commitValueCallback={commitReleaseChange}
				/>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={peakAccessor}
					name="peak"
					value={state.peak}
					commitValueCallback={commitPeakChange}
				/>
			</section>
		</>
	) : null;
};
