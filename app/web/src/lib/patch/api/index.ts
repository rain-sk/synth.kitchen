import { useCallback } from 'react';
import {
	Patch,
	PatchInfo,
	PatchQuery as SharedPatchQuery,
} from 'synth.kitchen-shared';

import { apiBase } from '../../../api/uri';
import { fetchWithJwt } from '../../shared/utils/fetchWithJwt';
import { navigate } from 'wouter/use-browser-location';

type PatchQuery = Pick<SharedPatchQuery, 'id' | 'slug' | 'random'>;
type PatchesQuery = Pick<SharedPatchQuery, 'creatorId'>;

export const useApi = () => {
	// const { dispatch } = useContext(PatchContext);

	const getPatch = useCallback(
		async (query: PatchQuery): Promise<Patch | undefined> => {
			const param = Object.entries(query)[0];
			const [key, value] = param;
			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			};
			try {
				const encodedKey = encodeURIComponent(key);
				const encodedValue = encodeURIComponent(value);
				const result = await fetch(
					`${apiBase}/patch/?${encodedKey}=${encodedValue}`,
					{
						headers,
						method: 'get',
					},
				).then((res) => res.json());
				if (!('patch' in result && typeof result.patch === 'object')) {
					throw new Error('Failed to load patch with given query');
				}
				return result.patch as Patch;
			} catch (error) {
				console.error(error, query);
			}

			return undefined;
		},
		[],
	);

	const getPatches = useCallback(
		async (query: PatchesQuery): Promise<Patch[] | undefined> => {
			const param = Object.entries(query)[0];
			const [key, value] = param as [string, string];
			const headers = {
				Accept: 'application/json',
			};
			try {
				const encodedKey = encodeURIComponent(key);
				const encodedValue = encodeURIComponent(value);
				const result = await fetch(
					`${apiBase}/patch/info/?${encodedKey}=${encodedValue}`,
					{
						headers,
						method: 'get',
					},
				).then((res) => res.json());
				if (!('patches' in result && Array.isArray(result.patches))) {
					throw new Error('Failed to load patches with given query');
				}
				return result.patches as Patch[];
			} catch (error) {
				console.error(error, query);
			}

			return undefined;
		},
		[],
	);

	const savePatch = useCallback(async (patch: Partial<Patch>) => {
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};

		if (!patch.id) {
			try {
				const result = await fetchWithJwt(`${apiBase}/patch/`, {
					headers,
					method: 'post',
					body: JSON.stringify(patch),
				}).then((res) => res.json());

				if (!('patch' in result && typeof result.patch === 'object')) {
					throw new Error('Failed to create patch');
				}

				navigate(`/patch/${result.patch.slug}`);
			} catch (error) {
				console.error('Failed to create patch:', error);
				throw error;
			}
		} else {
			try {
				const result = await fetchWithJwt(`${apiBase}/patch/${patch.id}`, {
					headers,
					method: 'put',
					body: JSON.stringify(patch),
				}).then((res) => res.json());

				if (!('patch' in result && typeof result.patch === 'object')) {
					throw new Error('Failed to update patch');
				}
			} catch (error) {
				console.error('Failed to update patch:', error);
				throw error;
			}
		}
	}, []);

	const deletePatch = useCallback(async (patchId: string) => {
		try {
			const result = await fetchWithJwt(`${apiBase}/patch/${patchId}`, {
				method: 'delete',
			}).then((res) => res.json());

			if (!('success' in result && typeof result.success === 'boolean')) {
				throw new Error('Failed to delete patch');
			}

			return result.success;
		} catch (error) {
			console.error('Failed to delete patch:', error);
			throw error;
		}
	}, []);

	const forkPatch = useCallback(async (patchId: string) => {
		try {
			const result = await fetchWithJwt(`${apiBase}/patch/fork/${patchId}`, {
				headers: { Accepts: 'application/json' },
				method: 'get',
			}).then((res) => res.json());

			if (!('patch' in result && typeof result.patch === 'object')) {
				throw new Error('Failed to fork patch');
			}

			navigate(`/patch/${result.patch.slug}`);
			return result.patch as Patch;
		} catch (error) {
			console.error('Failed to fork patch:', error);
			throw error;
		}
	}, []);

	const randomPatch = useCallback(async (): Promise<PatchInfo | null> => {
		try {
			const headers = {
				Accept: 'application/json',
			};

			const result = await fetchWithJwt(`${apiBase}/patch/info/?random=true`, {
				headers,
				method: 'get',
			}).then((res) => res.json());
			if (!('patch' in result)) {
				throw new Error('Failed to load patch with given query');
			}
			return result.patch as PatchInfo;
		} catch (error) {
			console.error('Failed to load random patch:', error);
		}
		return null;
	}, []);

	return {
		getPatch,
		getPatches,
		randomPatch,
		savePatch,
		deletePatch,
		forkPatch,
	};
};
