import React, { useCallback, useRef } from 'react';

import { SequencerNode } from '../audio/nodes/sequencer';

import { useModuleState } from '../hooks/use-module-state';
import { IModule, IModuleState } from '../state/types/module';
import { IoConnectors } from '../components/io-connectors';

// const sequencerStateFromNode = (
// 	sequencer: SequencerNode
// ): IModuleState['SEQUENCER'] => ({});

const initClock = (
	sequencerRef: React.MutableRefObject<SequencerNode | undefined>,
	state?: IModuleState['SEQUENCER']
) => {
	sequencerRef.current = new SequencerNode();
	if (state) {
		return state;
	} else {
		return {};
	}
};

export const SequencerModule: React.FC<{ module: IModule<'SEQUENCER'> }> = ({
	module
}) => {
	const sequencerRef = useRef<SequencerNode>();
	const [state] = useModuleState<'SEQUENCER'>(
		() => initClock(sequencerRef, module.state) as any,
		module.moduleKey
	);

	const enabled = state != undefined && sequencerRef.current;

	const inputAccessor = useCallback(
		() => sequencerRef.current?.node() as any,
		[enabled]
	);

	const outputAccessor = useCallback(
		() => sequencerRef.current?.node() as any,
		[enabled]
	);

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={[inputAccessor]}
				outputAccessors={[outputAccessor]}
			/>
			{/* <section>
				<NumberParameter
					moduleKey={module.moduleKey}
					paramAccessor={tempoAccessor}
					name="tempo"
					value={state.tempo}
					commitValueCallback={commitTempoChange}
				/>
			</section> */}
		</>
	) : (
		<p>loading...</p>
	);
};
