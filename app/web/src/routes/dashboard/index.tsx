import { Redirect } from 'wouter';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTitle } from 'react-use';

import { useApi } from '../../lib/patch/api';
import { AuthContext } from '../../api/auth/context';
import { PatchPreviews, CardPatch } from './patch-previews';
import { useRefBackedState } from '../../lib/shared/utils';

import './styles.css';
import { DashboardContext } from './context';
import { t } from '../../lang';

type Sort = 'newest' | 'name' | 'nameDesc';

const stamp = (p: CardPatch) => {
	const ms = p.createdAt ? Date.parse(p.createdAt) : NaN;
	return Number.isNaN(ms) ? 0 : ms;
};

const compare = (sort: Sort) => (a: CardPatch, b: CardPatch) => {
	if (sort === 'name') return a.name.localeCompare(b.name);
	if (sort === 'nameDesc') return b.name.localeCompare(a.name);
	return stamp(b) - stamp(a) || a.name.localeCompare(b.name);
};

const Skeleton = () => (
	<ul className="patch-grid" aria-hidden={true}>
		{Array.from({ length: 8 }, (_, i) => (
			<li key={i} className="patch-card is-skeleton" />
		))}
	</ul>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
	<div className="patch-state" role="alert">
		<p className="patch-state-title">{t('dashboard.errorTitle')}</p>
		<button type="button" className="patch-cta" onClick={onRetry}>
			{t('dashboard.retry')}
		</button>
	</div>
);

const EmptyState = ({ query, onClear }: { query: string; onClear: () => void }) => (
	<div className="patch-state">
		{query ? (
			<>
				<p className="patch-state-title">
					{t('dashboard.noResults', { query })}
				</p>
				<button type="button" className="patch-cta" onClick={onClear}>
					{t('dashboard.clear')}
				</button>
			</>
		) : (
			<>
				<p className="patch-state-title">{t('dashboard.empty')}</p>
				<p className="patch-state-hint">{t('dashboard.emptyHint')}</p>
				<a className="patch-cta" href="/patch/new">
					{t('dashboard.newPatch')}
				</a>
			</>
		)}
	</div>
);

export const DashboardRoute = () => {
	useTitle('synth.kitchen | dashboard');
	const { user, loading } = useContext(AuthContext);

	const { getPatches } = useApi();
	const [patches, setPatches] = useState<CardPatch[]>([]);

	const [error, setError] = useState<string | null>(null);
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState<Sort>('newest');

	const [busyRef, busy, setBusy] = useRefBackedState(false);

	const refresh = useCallback(async () => {
		if (!user?.id || busyRef.current) {
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const userPatches = await getPatches({ creatorId: user.id });
			setPatches(userPatches || []);
		} catch (err) {
			setError('failed');
			console.error(err);
		} finally {
			setBusy(false);
		}
	}, [busyRef, getPatches, user]);

	useEffect(() => {
		if (user?.id) {
			refresh();
		}
	}, [refresh, user]);

	const shown = useMemo(() => {
		const q = query.trim().toLowerCase();
		const list = q
			? patches.filter((p) => p.name.toLowerCase().includes(q))
			: patches;
		return [...list].sort(compare(sort));
	}, [patches, query, sort]);

	if (loading) return <div>Loading...</div>;
	else if (!user && !loading) return <Redirect to="/login" replace />;

	const count = patches.length;

	return (
		<DashboardContext.Provider value={{ refresh }}>
			<main id="dashboard">
				<header className="dash-head">
					<div className="dash-head-text">
						<h1>{t('dashboard.title')}</h1>
						<p className="dash-count">
							{count === 1
								? t('dashboard.countOne')
								: t('dashboard.count', { count })}
						</p>
					</div>
					<div className="dash-tools">
						<input
							id="patch-search"
							className="dash-search"
							type="search"
							placeholder={t('dashboard.search')}
							aria-label={t('dashboard.search')}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<select
							id="patch-sort"
							className="dash-sort"
							aria-label={t('dashboard.sort')}
							value={sort}
							onChange={(e) => setSort(e.target.value as Sort)}
						>
							<option value="newest">{t('dashboard.sortNewest')}</option>
							<option value="name">{t('dashboard.sortName')}</option>
							<option value="nameDesc">{t('dashboard.sortNameDesc')}</option>
						</select>
						<a id="new-patch" className="dash-new" href="/patch/new">
							{t('dashboard.newPatch')}
						</a>
					</div>
				</header>

				{error ? (
					<ErrorState onRetry={refresh} />
				) : busy ? (
					<Skeleton />
				) : shown.length === 0 ? (
					<EmptyState query={query} onClear={() => setQuery('')} />
				) : (
					<PatchPreviews patches={shown} />
				)}
			</main>
		</DashboardContext.Provider>
	);
};
