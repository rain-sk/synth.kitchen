import React, { useCallback } from 'react';

import { audioContext } from '../../../audio/context';

import { IModule, IModuleState } from '../../../state/types/module';
import { IoConnectors } from '../editor/io-connectors';
import { NumberParameter } from '../editor/number-parameter';
import { VcaNode } from '../../../audio/nodes/vca';
import { useNode } from '../../../hooks/use-node';

const vcaStateFromNode = (node: VcaNode): IModuleState['VCA'] => ({
	gate: Math.round(node.gate.value * 10000) / 10000,
	attack: Math.round(node.attack.value * 100) / 100,
	decay: Math.round(node.decay.value * 100) / 100,
	sustain: Math.round(node.sustain.value * 100) / 100,
	release: Math.round(node.release.value * 100) / 100,
	peak: Math.round(node.peak.value * 100) / 100,
});

const initVca = (vca: VcaNode, state?: IModuleState['VCA']) => {
	if (state) {
		vca.gate.setValueAtTime(state.gate, audioContext.currentTime);
		vca.attack.setValueAtTime(state.attack, audioContext.currentTime);
		vca.decay.setValueAtTime(state.decay, audioContext.currentTime);
		vca.sustain.setValueAtTime(state.sustain, audioContext.currentTime);
		vca.release.setValueAtTime(state.release, audioContext.currentTime);
		vca.peak.setValueAtTime(state.peak, audioContext.currentTime);
		return state;
	} else {
		return vcaStateFromNode(vca);
	}
};

export const VcaModule: React.FC<{ module: IModule<'VCA'> }> = ({ module }) => {
	const { node, state, setState } = useNode<VcaNode, 'VCA'>(
		module,
		initVca,
		() => new VcaNode(),
	);

	const enabled = state != undefined;

	const input = useCallback(() => node.gain(), [enabled]);

	const sync = useCallback(() => node.sync().node(), [enabled]);

	const output = useCallback(() => node.gain(), [enabled]);

	const commitGateChange = useCallback(
		(gate: number) => {
			node.gate.linearRampToValueAtTime(gate, audioContext.currentTime);
			setState({
				...state,
				gate,
			});
		},
		[state],
	);

	const gateAccessor = useCallback(() => node.gate, [enabled]);

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

	const commitDecayChange = useCallback(
		(decay: number) => {
			node.decay.linearRampToValueAtTime(decay, audioContext.currentTime);
			setState({
				...state,
				decay,
			});
		},
		[state],
	);

	const decayAccessor = useCallback(() => node.decay, [enabled]);

	const commitSustainChange = useCallback(
		(sustain: number) => {
			node.sustain.linearRampToValueAtTime(sustain, audioContext.currentTime);
			setState({
				...state,
				sustain,
			});
		},
		[state],
	);

	const sustainAccessor = useCallback(() => node.sustain, [enabled]);

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

	const commitPeakChange = useCallback(
		(peak: number) => {
			node.peak.linearRampToValueAtTime(peak, audioContext.currentTime);
			setState({
				...state,
				peak,
			});
		},
		[state],
	);

	const peakAccessor = useCallback(() => node.peak, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ input, sync }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={gateAccessor}
					name="gate"
					value={state.gate}
					commitValueCallback={commitGateChange}
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
