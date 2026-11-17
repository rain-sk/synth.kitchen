import { useCallback, useContext, useRef } from 'react';

import { PatchContext } from '../../contexts/patch';
import { useApi } from '../../api';
import { t } from '../../../../lang';
import { useToasts } from '../../../shared/components/toasts';
import { Patch } from 'synth.kitchen-shared';
import { SaveToCloudSvg } from './svg/save-to-cloud';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(PatchContext);

	const { savePatch } = useApi();
	const { notify, dismiss } = useToasts();

	const toastKey = `save:${id ?? name ?? 'new'}`;
	const save = useRef<() => void>(() => {});

	const onSave = useCallback(() => {
		const patch: Partial<Patch> = {
			id,
			name,
			state: { state: { name, modules, modulePositions, connections } } as any,
		};

		notify({ key: toastKey, kind: 'pending', message: t('toast.saving') });

		savePatch(patch)
			.then(() => {
				notify({ key: toastKey, kind: 'success', message: t('toast.saved') });
			})
			.catch(() => {
				notify({
					key: toastKey,
					kind: 'error',
					message: t('toast.saveFailed'),
					action: { label: t('toast.retry'), run: () => save.current() },
				});
			});
	}, [
		id,
		name,
		modules,
		modulePositions,
		connections,
		savePatch,
		notify,
		toastKey,
	]);

	save.current = onSave;

	return (
		<button
			type="button"
			id="save-to-cloud"
			onClick={() => {
				dismiss(toastKey);
				onSave();
			}}
		>
			<span className="visually-hidden">save to cloud</span>
			<SaveToCloudSvg />
		</button>
	);
};
