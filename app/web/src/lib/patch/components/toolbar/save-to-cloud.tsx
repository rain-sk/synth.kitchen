import { useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { usePathname, useSearch } from 'wouter/use-browser-location';

import { PatchContext } from '../../contexts/patch';
import { useDraftContext } from '../../contexts/draft';
import { useApi } from '../../api';
import { AuthContext } from '../../../../api/auth/context';
import { t } from '../../../../lang';
import {
	askAuth,
	clearAuthParams,
	readAfterAuth,
} from '../../../shared/auth-after';
import { useToasts } from '../../../shared/components/toasts';
import { Patch } from 'synth.kitchen-shared';
import { SaveToCloudSvg } from './svg/save-to-cloud';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(PatchContext);

	const { savePatch } = useApi();
	const { notify, dismiss } = useToasts();
	const { markSaved } = useDraftContext();
	const { user, loading } = useContext(AuthContext);

	const pathname = usePathname();
	const search = useSearch();
	const [, navigate] = useLocation();

	const toastKey = `save:${id ?? name ?? 'new'}`;
	const after = readAfterAuth(search);
	const fired = useRef(false);
	const save = useRef<() => void>(() => {});

	const performSave = useCallback((): Promise<boolean> => {
		const patch: Partial<Patch> = {
			id,
			name,
			state: {
				state: { name, modules, modulePositions, connections },
			} as any,
		};

		notify({ key: toastKey, kind: 'pending', message: t('toast.saving') });

		return savePatch(patch)
			.then(() => {
				markSaved();
				notify({ key: toastKey, kind: 'success', message: t('toast.saved') });
				return true;
			})
			.catch(() => {
				notify({
					key: toastKey,
					kind: 'error',
					message: t('toast.saveFailed'),
					action: { label: t('toast.retry'), run: () => save.current() },
				});
				return false;
			});
	}, [
		markSaved,
		id,
		name,
		modules,
		modulePositions,
		connections,
		savePatch,
		notify,
		toastKey,
	]);

	const askToRegister = useCallback(() => {
		navigate(askAuth(pathname, search, 'register', 'save'));
		notify({
			key: toastKey,
			kind: 'info',
			message: t('toast.signInToSave'),
		});
	}, [navigate, pathname, search, notify, toastKey]);

	const onSave = useCallback(() => {
		if (loading) return;

		if (!user) {
			askToRegister();
			return;
		}

		void performSave();
	}, [loading, user, askToRegister, performSave]);

	save.current = () => {
		void performSave();
	};

	useEffect(() => {
		if (after !== 'save' || loading || !user || fired.current) return;
		fired.current = true;

		void performSave().then((saved) => {
			if (!saved) {
				fired.current = false;
				return;
			}
			const to = clearAuthParams(pathname);
			if (to) navigate(to, { replace: true });
		});
	}, [after, loading, user, performSave, navigate, pathname]);

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
