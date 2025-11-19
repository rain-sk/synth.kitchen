import { useCallback, useState } from 'react';
import { Input, ModuleType, Output } from 'synth.kitchen-shared';
import JSConfetti from 'js-confetti';

import { PatchEditor } from '../patch/components/editor';
import { IPatchAction, patchActions } from '../patch/state/actions';
import { IPatchState } from '../patch/state/types/patch';
import { connectionKey } from '../patch/state/connection';

import './styles.css';

export type Preset = {
	title: string;
	content: () => React.JSX.Element;
	setup?: IPatchAction[];
	proceed: (state: IPatchState) => boolean;
};

const presets: Preset[] = [
	{
		title: 'Getting started',
		content: () => <p>Connect the oscillator's output to the speaker.</p>,
		setup: [
			patchActions.addModuleAction(ModuleType.OSCILLATOR, [100, 100], {
				id: '1',
			}),
		],
		proceed: (state) => {
			const connectionKeys = Object.keys(state.connections.state);

			return connectionKeys.some(
				(key) =>
					key ===
					connectionKey(
						{ moduleId: '1', type: 1, channel: 0 } as Output,
						{ moduleId: '0', type: 0, channel: 0 } as Input,
					),
			);
		},
	},
	{
		title: 'Getting started 2',
		content: () => <p>hello</p>,
		proceed: (state) => {
			return (
				state.asyncActionQueue.length === 0 &&
				Object.keys(state.connections.state).length === 0
			);
		},
	},
];

export const Learn = () => {
	const [step, setStep] = useState(0);
	const [unlockNext, setUnlockNext] = useState(false);

	const preset = presets[step];

	const checkState = useCallback(
		(state: IPatchState) => {
			if (!unlockNext && preset && preset.proceed(state)) {
				const jsConfetti = new JSConfetti();
				jsConfetti.addConfetti();
				setUnlockNext(true);
			}
		},
		[unlockNext, step],
	);

	const onClickNext = useCallback(() => {
		setUnlockNext(false);
		setStep(step + 1);
	}, [step]);

	const onClickPrevious = useCallback(() => {
		setStep(step - 1);
		setUnlockNext(true);
	}, [step]);

	return (
		<div id="learn">
			<div id="lesson">
				{preset ? (
					<>
						<h2>{preset.title}</h2>
						<div>{preset.content()}</div>
						<div className="toolbar">
							<section>
								<button
									type="button"
									disabled={step === 0}
									onClick={onClickPrevious}
								>
									previous
								</button>
							</section>
							<section>
								<button
									type="button"
									disabled={!unlockNext}
									onClick={onClickNext}
								>
									next
								</button>
							</section>
						</div>
					</>
				) : (
					<h2>You finished!</h2>
				)}
			</div>
			<div id="patch">
				{preset && <PatchEditor preset={preset} stateCallback={checkState} />}
			</div>
		</div>
	);
};
