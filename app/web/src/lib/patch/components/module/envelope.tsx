import React, { useCallback, useEffect, useRef } from 'react';

import { audioContext } from '../../audio';

import { EnvelopeNode } from '../../audio/nodes/envelope';
import { IoConnectors } from '../module-ui/io-connectors';
import { NumberParameter } from '../module-ui/number-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const envelopeStateFromNode = (
	node: EnvelopeNode,
): ModuleState['ENVELOPE'] => ({
	version: '0.5.4',
	hold: Math.round(node.hold.value * 10000) / 10000,
	attack: Math.round(node.attack.value * 100) / 100,
	decay: Math.round(node.decay.value * 100) / 100,
	sustain: Math.round(node.sustain.value * 100) / 100,
	release: Math.round(node.release.value * 100) / 100,
	peak: Math.round(node.peak.value * 100) / 100,
});

const initEnvelope = (
	envelope: EnvelopeNode,
	state?: ModuleState['ENVELOPE'],
) => {
	if (state) {
		envelope.hold.setValueAtTime(state.hold, audioContext.currentTime);
		envelope.attack.setValueAtTime(state.attack, audioContext.currentTime);
		envelope.decay.setValueAtTime(state.decay, audioContext.currentTime);
		envelope.sustain.setValueAtTime(state.sustain, audioContext.currentTime);
		envelope.release.setValueAtTime(state.release, audioContext.currentTime);
		envelope.peak.setValueAtTime(state.peak, audioContext.currentTime);
		return state;
	} else {
		return envelopeStateFromNode(envelope);
	}
};

export const EnvelopeModule: React.FC<{
	module: Module<ModuleType.ENVELOPE>;
}> = ({ module }) => {
	const { node, state, setState } = useNode<EnvelopeNode, ModuleType.ENVELOPE>(
		module,
		initEnvelope,
		() => new EnvelopeNode(),
	);

	const enabled = state != undefined;

	const sync = useCallback(() => node.sync(), [enabled]);

	const output = useCallback(() => node.gain(), [enabled]);

	const commitHoldChange = useCallback(
		(hold: number) => {
			node.hold.linearRampToValueAtTime(hold, audioContext.currentTime);
			setState({
				...state,
				hold,
			});
		},
		[state],
	);

	const holdAccessor = useCallback(() => node.hold, [enabled]);

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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.hold !== node.hold.value) {
			commitHoldChange(module.state.hold);
		}
		if (module.state.attack !== node.attack.value) {
			commitAttackChange(module.state.attack);
		}
		if (module.state.sustain !== node.sustain.value) {
			commitSustainChange(module.state.sustain);
		}
		if (module.state.release !== node.release.value) {
			commitReleaseChange(module.state.release);
		}
		if (module.state.peak !== node.peak.value) {
			commitPeakChange(module.state.peak);
		}
	}, [
		module.state,
		commitHoldChange,
		commitAttackChange,
		commitSustainChange,
		commitReleaseChange,
		commitPeakChange,
	]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{ sync }}
				outputAccessors={{ output }}
			/>

			<section>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={holdAccessor}
					name="hold"
					legacyName="gate"
					value={state.hold}
					commitValueCallback={commitHoldChange}
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
					paramAccessor={decayAccessor}
					name="decay"
					value={state.decay}
					commitValueCallback={commitDecayChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={sustainAccessor}
					name="sustain"
					value={state.sustain}
					commitValueCallback={commitSustainChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={releaseAccessor}
					name="release"
					value={state.release}
					commitValueCallback={commitReleaseChange}
				/>
				<NumberParameter
					moduleId={module.id}
					paramAccessor={peakAccessor}
					name="peak"
					value={state.peak}
					commitValueCallback={commitPeakChange}
				/>
			</section>
		</>
	) : null;
};
