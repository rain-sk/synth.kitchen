import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { PatchInfo } from 'synth.kitchen-shared';
import { Link } from 'wouter';

import { MenuDots } from '../../lib/patch/components/toolbar/svg/menu-dots';
import { useRefBackedState } from '../../lib/shared/utils';
import { AuthContext } from '../../api/auth/context';
import { useApi } from '../../lib/patch/api';
import { DashboardContext } from './context';
import { t } from '../../lang';

export type CardPatch = PatchInfo & { createdAt?: string };

const ACCENTS = ['#7cd2e2', '#bf82bb', '#9142a0', '#b9ffce', '#c8b6e0'];

const accentOf = (seed: string) => {
	let h = 0;
	for (let i = 0; i < seed.length; i++) {
		h = (h * 31 + seed.charCodeAt(i)) % ACCENTS.length;
	}
	return ACCENTS[h];
};

export const PatchPreview: React.FC<{ patchInfo: CardPatch }> = ({
	patchInfo,
}) => {
	const { user } = useContext(AuthContext);
	const { refresh } = useContext(DashboardContext);
	const { deletePatch, forkPatch } = useApi();

	const [showMenu, setShowMenu] = useState(false);
	const [confirming, setConfirming] = useState(false);
	const [, menu, setMenu] = useRefBackedState<HTMLElement | undefined>(
		undefined,
	);
	const wrapRef = useRef<HTMLElement | null>(null);
	const confirmTimer = useRef<number>(undefined);

	const owned = !!user && user.id === patchInfo.creator.id;

	useEffect(() => {
		if (!showMenu) {
			return;
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowMenu(false);
				setConfirming(false);
			}
		};
		const onAway = (e: MouseEvent) => {
			if (!wrapRef.current?.contains(e.target as Node)) {
				setShowMenu(false);
				setConfirming(false);
			}
		};
		document.addEventListener('keydown', onKey);
		document.addEventListener('mousedown', onAway);
		menu?.focus();
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('mousedown', onAway);
		};
	}, [menu, showMenu]);

	useEffect(() => () => window.clearTimeout(confirmTimer.current), []);

	const close = () => {
		setShowMenu(false);
		setConfirming(false);
	};

	const [forkingRef, forking, setForking] = useRefBackedState(false);
	const handleFork = useCallback(async () => {
		if (forkingRef.current) {
			return;
		}
		setForking(true);
		try {
			await forkPatch(patchInfo.id);
		} catch (e) {
			console.error(e);
			close();
			refresh();
		}
		setForking(false);
	}, [forkPatch, forkingRef, patchInfo, refresh]);

	const [deletingRef, deleting, setDeleting] = useRefBackedState(false);
	const handleDelete = useCallback(async () => {
		if (deletingRef.current) {
			return;
		}
		setDeleting(true);
		try {
			await deletePatch(patchInfo.id);
		} catch (e) {
			console.error(e);
		}
		close();
		refresh();
		setDeleting(false);
	}, [deletePatch, deletingRef, patchInfo, refresh]);

	const armed = confirming || deleting;

	return (
		<li
			className={`patch-card${owned ? ' is-owned' : ''}`}
			data-slug={patchInfo.slug}
			data-created={patchInfo.createdAt ? Date.parse(patchInfo.createdAt) : 0}
			style={{ ['--accent' as any]: accentOf(patchInfo.slug) }}
		>
			<Link
				className="patch-card-face"
				to={`/patch/${patchInfo.slug}`}
				aria-label={`${t('dashboard.open')}: ${patchInfo.name}`}
			>
				<span className="patch-card-name">{patchInfo.name}</span>
			</Link>
			<span className="patch-card-menu" ref={wrapRef}>
				<button
					type="button"
					id={`menu-${patchInfo.slug}`}
					className="patch-menu-button"
					aria-haspopup="true"
					aria-expanded={showMenu}
					aria-label={t('dashboard.more', { name: patchInfo.name })}
					onClick={() => setShowMenu((v) => !v)}
				>
					<MenuDots />
				</button>
				{(showMenu || forking || deleting) && (
					<ul
						id={`menu-popup-${patchInfo.slug}`}
						className="patch-menu-popup"
						role="menu"
						tabIndex={-1}
						ref={(ref) => setMenu(ref ?? undefined)}
					>
						<li role="none">
							<button
								type="button"
								id={`fork-${patchInfo.slug}`}
								role="menuitem"
								disabled={forking}
								onClick={handleFork}
							>
								{forking ? t('dashboard.forking') : t('dashboard.fork')}
							</button>
						</li>
						{owned && (
							<li role="none">
								<button
									type="button"
									id={`delete-${patchInfo.slug}`}
									className={`patch-menu-danger${armed ? ' is-armed' : ''}`}
									role="menuitem"
									disabled={deleting}
									onClick={() => {
										if (!confirming) {
											setConfirming(true);
											window.clearTimeout(confirmTimer.current);
											confirmTimer.current = window.setTimeout(
												() => setConfirming(false),
												4000,
											);
											return;
										}
										handleDelete();
									}}
								>
									{deleting
										? t('dashboard.deleting')
										: confirming
											? t('dashboard.confirmDelete')
											: t('dashboard.delete')}
								</button>
							</li>
						)}
					</ul>
				)}
			</span>
		</li>
	);
};

export const PatchPreviews: React.FC<{ patches: CardPatch[] }> = ({
	patches,
}) => {
	return (
		<ul className="patch-grid">
			{patches.map((patchInfo) => (
				<PatchPreview key={patchInfo.id} patchInfo={patchInfo} />
			))}
		</ul>
	);
};
