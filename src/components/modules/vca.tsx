import React, { useCallback } from 'react';

import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { VcaNode } from '../../audio/nodes/vca';
import { useNodeRef } from '../../hooks/use-node-ref';

const vcaStateFromNode = (node: VcaNode): IModuleState['VCA'] => ({
	gate: Math.round(node.gate.value * 10000) / 10000,
	attack: Math.round(node.attack.value * 100) / 100,
	decay: Math.round(node.decay.value * 100) / 100,
	sustain: Math.round(node.sustain.value * 100) / 100,
	release: Math.round(node.release.value * 100) / 100,
	peak: Math.round(node.peak.value * 100) / 100,
});

const initVca = (
	vcaRef: React.MutableRefObject<VcaNode | undefined>,
	state?: IModuleState['VCA'],
) => {
	if (!vcaRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		vcaRef.current.gate.setValueAtTime(state.gate, audioContext.currentTime);
		vcaRef.current.attack.setValueAtTime(
			state.attack,
			audioContext.currentTime,
		);
		vcaRef.current.decay.setValueAtTime(state.decay, audioContext.currentTime);
		vcaRef.current.sustain.setValueAtTime(
			state.sustain,
			audioContext.currentTime,
		);
		vcaRef.current.release.setValueAtTime(
			state.release,
			audioContext.currentTime,
		);
		vcaRef.current.peak.setValueAtTime(state.peak, audioContext.currentTime);
		return state;
	} else {
		return vcaStateFromNode(vcaRef.current);
	}
};

export const VcaModule: React.FC<{ module: IModule<'VCA'> }> = ({ module }) => {
	const vcaRef = useNodeRef(() => new VcaNode());
	const [state, setState] = useModuleState<'VCA', VcaNode>(vcaRef, module, () =>
		initVca(vcaRef, module.state),
	);

	const enabled = state != undefined;

	const input = useCallback(() => vcaRef.current.gain(), [enabled]);

	const sync = useCallback(() => vcaRef.current.sync().node(), [enabled]);

	const output = useCallback(() => vcaRef.current.gain(), [enabled]);

	const commitGateChange = useCallback(
		(gate: number) => {
			vcaRef.current.gate.linearRampToValueAtTime(
				gate,
				audioContext.currentTime,
			);
			setState({
				...state,
				gate,
			});
		},
		[state],
	);

	const gateAccessor = useCallback(() => vcaRef.current.gate, [enabled]);

	const commitAttackChange = useCallback(
		(attack: number) => {
			vcaRef.current.attack.linearRampToValueAtTime(
				attack,
				audioContext.currentTime,
			);
			setState({
				...state,
				attack,
			});
		},
		[state],
	);

	const attackAccessor = useCallback(() => vcaRef.current.attack, [enabled]);

	const commitDecayChange = useCallback(
		(decay: number) => {
			vcaRef.current.decay.linearRampToValueAtTime(
				decay,
				audioContext.currentTime,
			);
			setState({
				...state,
				decay,
			});
		},
		[state],
	);

	const decayAccessor = useCallback(() => vcaRef.current.decay, [enabled]);

	const commitSustainChange = useCallback(
		(sustain: number) => {
			vcaRef.current.sustain.linearRampToValueAtTime(
				sustain,
				audioContext.currentTime,
			);
			setState({
				...state,
				sustain,
			});
		},
		[state],
	);

	const sustainAccessor = useCallback(() => vcaRef.current.sustain, [enabled]);

	const commitReleaseChange = useCallback(
		(release: number) => {
			vcaRef.current.release.linearRampToValueAtTime(
				release,
				audioContext.currentTime,
			);
			setState({
				...state,
				release,
			});
		},
		[state],
	);

	const releaseAccessor = useCallback(() => vcaRef.current.release, [enabled]);

	const commitPeakChange = useCallback(
		(peak: number) => {
			vcaRef.current.peak.linearRampToValueAtTime(
				peak,
				audioContext.currentTime,
			);
			setState({
				...state,
				peak,
			});
		},
		[state],
	);

	const peakAccessor = useCallback(() => vcaRef.current.peak, [enabled]);

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
