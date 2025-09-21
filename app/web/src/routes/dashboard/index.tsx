import { Link } from 'wouter';
import { navigate } from 'wouter/use-browser-location';
import { useContext, useEffect, useState } from 'react';

import { useApi } from '../../lib/patch/api';
import { AuthContext } from '../../api/auth/context';

export const DashboardRoute = () => {
	const { user, loading: userLoading } = useContext(AuthContext);
	useEffect(() => {
		if (!user && !userLoading) {
			navigate('/login', { replace: true });
		}
	}, [user, userLoading]);
	const { getPatches } = useApi();
	const [patches, setPatches] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPatches = async () => {
			if (user && user.id) {
				try {
					const userPatches = await getPatches({ creatorId: user?.id ?? '' });
					setPatches(userPatches || []);
				} catch (err) {
					setError('Failed to load patches');
					console.error(err);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchPatches();
	}, [getPatches, user, user?.id]);

	if (loading) return <div>Loading patches...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h1>Dashboard</h1>
			<h2>Your Patches</h2>
			{patches.length === 0 ? (
				<p>No patches found.</p>
			) : (
				<ul>
					{patches.map((patch) => (
						<li key={patch.id}>
							<Link to={`/patch/${patch.slug}`}>
								<h3>{patch.name || 'Unnamed Patch'}</h3>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
