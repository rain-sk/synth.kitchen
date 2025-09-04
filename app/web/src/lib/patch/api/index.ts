import { useCallback } from 'react';
import { apiBase } from '../../../api/uri';
import { Patch, PatchQuery as SharedPatchQuery } from 'synth.kitchen-shared';

type PatchQuery = Exclude<SharedPatchQuery, { creatorId: string }>;
type PatchesQuery = Exclude<
	SharedPatchQuery,
	{ id: string } | { slug: string }
>;

export const useApi = () => {
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

	return { getPatch, getPatches };
};
