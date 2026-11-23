import { useCallback, useContext, useRef } from 'react';
import { useLocation } from 'wouter';
import { usePathname, useSearch } from 'wouter/use-browser-location';

import { PatchContext } from '../../contexts/patch';
import { useApi } from '../../api';
import { AuthContext } from '../../../../api/auth/context';
import { t } from '../../../../lang';
import { setPendingIntent } from '../../../shared/auth-pending';
import { useToasts } from '../../../shared/components/toasts';
import { Patch } from 'synth.kitchen-shared';
import { SaveToCloudSvg } from './svg/save-to-cloud';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(PatchContext);

	const { savePatch } = useApi();
	const { notify, dismiss } = useToasts();
	const { user, loading } = useContext(AuthContext);

	const pathname = usePathname();
	const search = useSearch();
	const [, navigate] = useLocation();

	const toastKey = `save:${id ?? name ?? 'new'}`;
	const save = useRef<() => void>(() => {});

	const performSave = useCallback(() => {
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

	// pushing, not replacing: Back then closes the dialog rather than leaving the patch
	// the pending intent is the save itself, never the gated wrapper: when it runs the jwt has
	// arrived but this render's `user` can still be undefined, and re-gating re-opens the dialog
	const askToRegister = useCallback(() => {
		setPendingIntent(() => save.current());
		const params = new URLSearchParams(search);
		params.set('auth', 'register');
		navigate(`${pathname}?${params.toString()}`);
		notify({
			key: toastKey,
			kind: 'info',
			message: t('toast.signInToSave'),
		});
	}, [navigate, pathname, search, notify, toastKey]);

	const onSave = useCallback(() => {
		if (loading) return;

		// an anonymous save cannot succeed, so it is not attempted: the endpoint answers 401
		// and the retry on that toast can only fail again
		if (!user) {
			askToRegister();
			return;
		}

		performSave();
	}, [loading, user, askToRegister, performSave]);

	save.current = performSave;

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
