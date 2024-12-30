import React, { useCallback, useRef } from 'react';

import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { EnvelopeNode } from '../../audio/nodes/envelope';

const envelopeStateFromNode = (
	node: EnvelopeNode,
): IModuleState['ENVELOPE'] => ({
	gate: Math.round(node.gate.value * 10000) / 10000,
	attack: Math.round(node.attack.value * 100) / 100,
	decay: Math.round(node.decay.value * 100) / 100,
	sustain: Math.round(node.sustain.value * 100) / 100,
	release: Math.round(node.release.value * 100) / 100,
	peak: Math.round(node.peak.value * 100) / 100,
});

const initEnvelope = (
	envelopeRef: React.MutableRefObject<EnvelopeNode | undefined>,
	state?: IModuleState['ENVELOPE'],
) => {
	envelopeRef.current = new EnvelopeNode();
	if (state) {
		envelopeRef.current.gate.setValueAtTime(
			state.gate,
			audioContext.currentTime,
		);
		envelopeRef.current.attack.setValueAtTime(
			state.attack,
			audioContext.currentTime,
		);
		envelopeRef.current.decay.setValueAtTime(
			state.decay,
			audioContext.currentTime,
		);
		envelopeRef.current.sustain.setValueAtTime(
			state.sustain,
			audioContext.currentTime,
		);
		envelopeRef.current.release.setValueAtTime(
			state.release,
			audioContext.currentTime,
		);
		envelopeRef.current.peak.setValueAtTime(
			state.peak,
			audioContext.currentTime,
		);
		return state;
	} else {
		return envelopeStateFromNode(envelopeRef.current);
	}
};

export const EnvelopeModule: React.FC<{ module: IModule<'ENVELOPE'> }> = ({
	module,
}) => {
	const envelopeRef = useRef<EnvelopeNode>();
	const [state, setState] = useModuleState<'ENVELOPE', EnvelopeNode>(
		envelopeRef,
		module,
		() => initEnvelope(envelopeRef, module.state),
	);

	const enabled = state != undefined;

	const sync = useCallback(
		() => envelopeRef.current?.sync().node() as any,
		[enabled],
	);

	const output = useCallback(
		() => envelopeRef.current?.gain() as any,
		[enabled],
	);

	const commitGateChange = useCallback(
		(gate: number) => {
			envelopeRef.current?.gate.linearRampToValueAtTime(
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

	const gateAccessor = useCallback(
		() => envelopeRef.current?.gate as any,
		[enabled],
	);

	const commitAttackChange = useCallback(
		(attack: number) => {
			envelopeRef.current?.attack.linearRampToValueAtTime(
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

	const attackAccessor = useCallback(
		() => envelopeRef.current?.attack as any,
		[enabled],
	);

	const commitDecayChange = useCallback(
		(decay: number) => {
			envelopeRef.current?.decay.linearRampToValueAtTime(
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

	const decayAccessor = useCallback(
		() => envelopeRef.current?.decay as any,
		[enabled],
	);

	const commitSustainChange = useCallback(
		(sustain: number) => {
			envelopeRef.current?.sustain.linearRampToValueAtTime(
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

	const sustainAccessor = useCallback(
		() => envelopeRef.current?.sustain as any,
		[enabled],
	);

	const commitReleaseChange = useCallback(
		(release: number) => {
			envelopeRef.current?.release.linearRampToValueAtTime(
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

	const releaseAccessor = useCallback(
		() => envelopeRef.current?.release as any,
		[enabled],
	);

	const commitPeakChange = useCallback(
		(peak: number) => {
			envelopeRef.current?.peak.linearRampToValueAtTime(
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

	const peakAccessor = useCallback(
		() => envelopeRef.current?.peak as any,
		[enabled],
	);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ sync }}
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
