import React, { useCallback, useRef } from 'react';

import { AdsrNode } from '../../audio/nodes/adsr';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { NumberParameter } from '../number-parameter';
import { audioContext } from '../../audio/context';
import { useEffectOnce } from '../../hooks/use-effect-once';

const adsrStateFromNode = (adsr: AdsrNode): IModuleState['ADSR'] => ({
	attack: Math.round(adsr.attack.value * 100) / 100,
	decay: Math.round(adsr.decay.value * 100) / 100,
	sustain: Math.round(adsr.sustain.value * 100) / 100,
	release: Math.round(adsr.release.value * 100) / 100
});

const initAdsr = (
	adsrRef: React.MutableRefObject<AdsrNode | undefined>,
	state?: IModuleState['ADSR']
) => {
	adsrRef.current = new AdsrNode();
	if (state) {
		return state;
	} else {
		return adsrStateFromNode(adsrRef.current);
	}
};

export const AdsrModule: React.FC<{ module: IModule<'ADSR'> }> = ({
	module
}) => {
	const adsrRef = useRef<AdsrNode>();
	const [state, setState] = useModuleState<'ADSR'>(
		() => initAdsr(adsrRef, module.state) as any,
		module.moduleKey
	);

	useEffectOnce(() => {
		adsrRef.current?.disconnect();
	});

	const commitAttackChange = useCallback(
		(attack: number) => {
			adsrRef.current?.attack.linearRampToValueAtTime(
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

	const commitDecayChange = useCallback(
		(decay: number) => {
			adsrRef.current?.decay.linearRampToValueAtTime(
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

	const commitSustainChange = useCallback(
		(sustain: number) => {
			adsrRef.current?.sustain.linearRampToValueAtTime(
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

	const commitReleaseChange = useCallback(
		(release: number) => {
			adsrRef.current?.release.linearRampToValueAtTime(
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

	const enabled = state != undefined && adsrRef.current;

	const attackAccessor = useCallback(
		() => adsrRef.current?.attack as any,
		[enabled]
	);

	const decayAccessor = useCallback(
		() => adsrRef.current?.decay as any,
		[enabled]
	);

	const sustainAccessor = useCallback(
		() => adsrRef.current?.sustain as any,
		[enabled]
	);

	const releaseAccessor = useCallback(
		() => adsrRef.current?.release as any,
		[enabled]
	);

	const gate = useCallback(() => adsrRef.current?.node() as any, [enabled]);

	const output = useCallback(() => adsrRef.current?.node() as any, [enabled]);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{ gate }}
				outputAccessors={{ output }}
			/>
			<section>
				<h3 className="visually-hidden">Parameters</h3>
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
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
