import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PatchInfo } from 'synth.kitchen-shared';
import { Link } from 'wouter';

import { MenuDots } from '../../lib/patch/components/toolbar/svg/menu-dots';
import { useRefBackedState } from '../../lib/shared/utils/use-ref-backed-state';
import { AuthContext } from '../../api/auth/context';
import { useApi } from '../../lib/patch/api';
import { DashboardContext } from './context';

export const PatchPreview: React.FC<{ patchInfo: PatchInfo }> = ({
	patchInfo,
}) => {
	const { user } = useContext(AuthContext);
	const { refresh } = useContext(DashboardContext);
	const { deletePatch, forkPatch } = useApi();
	const [showMenu, setShowMenu] = useState(false);
	const [menuRef, menu, setMenu] = useRefBackedState<HTMLElement | undefined>(
		undefined,
	);

	const onClickMenuButton = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		const onBlur = (e: any) => {
			if (
				!menuRef.current?.contains(e.relatedTarget) ||
				menuRef.current === e.relatedTarget
			) {
				setShowMenu(false);
				menuRef.current?.removeEventListener('blur', onBlur);
			}
		};
		if (menuRef.current) {
			menuRef.current.focus();
			menuRef.current.addEventListener('blur', onBlur);
		}
		return () => {
			menuRef.current?.removeEventListener('blur', onBlur);
		};
	}, [menu]);

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
		}
		refresh();
		setForking(false);
		setShowMenu(false);
	}, [patchInfo, refresh]);

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
		refresh();
		setDeleting(false);
		setShowMenu(false);
	}, [patchInfo, refresh]);

	const deleteEnabled = user && user.id === patchInfo.creator.id;

	const doShowMenu = showMenu || forking || deleting;

	return (
		<li>
			<Link to={`/patch/${patchInfo.slug}`}>
				<h3>{patchInfo.name}</h3>
			</Link>
			<span className="menu">
				<button type="button" onClick={onClickMenuButton}>
					<MenuDots />
				</button>
				{doShowMenu && (
					<ul
						className="menu-popup"
						tabIndex={0}
						ref={(ref) => {
							setMenu(ref ?? undefined);
						}}
					>
						<li>
							<button type="button" onClick={handleFork}>
								fork
							</button>
						</li>
						{deleteEnabled && (
							<li>
								<button type="button" onClick={handleDelete}>
									delete
								</button>
							</li>
						)}
					</ul>
				)}
			</span>
		</li>
	);
};

export const PatchPreviews: React.FC<{ patches: PatchInfo[] }> = ({
	patches,
}) => {
	return (
		<ul className="patch-previews">
			{patches.map((patchInfo) => (
				<PatchPreview key={patchInfo.id} patchInfo={patchInfo} />
			))}
		</ul>
	);
};
