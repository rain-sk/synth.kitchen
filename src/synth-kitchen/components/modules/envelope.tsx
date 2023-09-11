import React, { useCallback, useRef } from 'react';

import { audioContext } from '../../audio/context';
import { useModuleState } from '../../hooks/use-module-state';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { useEffectOnce } from '../../hooks/use-effect-once';
import { EnvelopeNode } from '../../audio/nodes/envelope';

const envelopeStateFromNode = (
	node: EnvelopeNode
): IModuleState['ENVELOPE'] => ({
	attack: Math.round(node.attack.value * 100) / 100,
	decay: Math.round(node.decay.value * 100) / 100,
	sustain: Math.round(node.sustain.value * 100) / 100,
	release: Math.round(node.release.value * 100) / 100,
	peak: Math.round(node.peak.value * 100) / 100
});

const initEnvelope = (
	envelopeRef: React.MutableRefObject<EnvelopeNode | undefined>,
	state?: IModuleState['ENVELOPE']
) => {
	envelopeRef.current = new EnvelopeNode();
	if (state) {
		envelopeRef.current.attack.setValueAtTime(
			state.attack,
			audioContext.currentTime
		);
		envelopeRef.current.decay.setValueAtTime(
			state.decay,
			audioContext.currentTime
		);
		envelopeRef.current.sustain.setValueAtTime(
			state.sustain,
			audioContext.currentTime
		);
		envelopeRef.current.release.setValueAtTime(
			state.release,
			audioContext.currentTime
		);
		envelopeRef.current.peak.setValueAtTime(
			state.peak,
			audioContext.currentTime
		);
		return state;
	} else {
		return envelopeStateFromNode(envelopeRef.current);
	}
};

export const EnvelopeModule: React.FC<{ module: IModule<'ENVELOPE'> }> = ({
	module
}) => {
	const envelopeRef = useRef<EnvelopeNode>();
	const [state, setState] = useModuleState<'ENVELOPE'>(
		() => initEnvelope(envelopeRef, module.state),
		module.moduleKey
	);

	const enabled = state != undefined;

	useEffectOnce(() => () => {
		envelopeRef.current?.disconnect();
	});

	const gate = useCallback(
		() => envelopeRef.current?.adsr().node() as any,
		[enabled]
	);

	const output = useCallback(
		() => envelopeRef.current?.gain() as any,
		[enabled]
	);

	const commitAttackChange = useCallback(
		(attack: number) => {
			envelopeRef.current?.attack.linearRampToValueAtTime(
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
		() => envelopeRef.current?.attack as any,
		[enabled]
	);

	const commitDecayChange = useCallback(
		(decay: number) => {
			envelopeRef.current?.decay.linearRampToValueAtTime(
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
		() => envelopeRef.current?.decay as any,
		[enabled]
	);

	const commitSustainChange = useCallback(
		(sustain: number) => {
			envelopeRef.current?.sustain.linearRampToValueAtTime(
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
		() => envelopeRef.current?.sustain as any,
		[enabled]
	);

	const commitReleaseChange = useCallback(
		(release: number) => {
			envelopeRef.current?.release.linearRampToValueAtTime(
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
		() => envelopeRef.current?.release as any,
		[enabled]
	);

	const commitPeakChange = useCallback(
		(peak: number) => {
			envelopeRef.current?.peak.linearRampToValueAtTime(
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
		() => envelopeRef.current?.peak as any,
		[enabled]
	);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ gate }}
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
