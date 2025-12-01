import { Redirect } from 'wouter';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTitle } from 'react-use';

import { useApi } from '../../lib/patch/api';
import { AuthContext } from '../../api/auth/context';
import { PatchPreviews } from './patch-previews';

import './styles.css';
import { DashboardContext } from './context';
import { Loader } from '../../lib/shared/components/loader';
import { useRefBackedState } from '../../lib/shared/utils';

export const DashboardRoute = () => {
	useTitle('synth.kitchen | dashboard');
	const { user, loading } = useContext(AuthContext);

	const { getPatches } = useApi();
	const [patches, setPatches] = useState<any[]>([]);

	const [error, setError] = useState<string | null>(null);

	const [loadingPatchesRef, loadingPatches, setLoadingPatches] =
		useRefBackedState(false);
	const refresh = useCallback(() => {
		if (loadingPatchesRef.current) {
			return;
		}
		const fetchPatches = async () => {
			if (user && user.id) {
				setLoadingPatches(true);
				try {
					const userPatches = await getPatches({ creatorId: user?.id ?? '' });
					setPatches(userPatches || []);
				} catch (err) {
					setError('Failed to load patches');
					console.error(err);
				} finally {
					setLoadingPatches(false);
				}
			}
		};
		fetchPatches();
	}, [getPatches, user]);

	useEffect(refresh, [refresh]);

	if (loading) return <div>Loading...</div>;
	else if (!user && !loading) return <Redirect to="/login" replace />;
	if (error) return <div>Error: {error}</div>;

	return (
		<DashboardContext.Provider value={{ refresh }}>
			<main>
				<h1>Dashboard</h1>
				<h2>Your Patches</h2>
				{loading || loadingPatches ? (
					<Loader />
				) : patches.length === 0 ? (
					<p>No saved patches.</p>
				) : (
					<PatchPreviews patches={patches} />
				)}
			</main>
		</DashboardContext.Provider>
	);
};
