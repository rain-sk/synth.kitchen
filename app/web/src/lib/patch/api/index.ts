import { useCallback } from 'react';
import { apiBase } from '../../../api/uri';
import { Patch } from 'synth.kitchen-shared';

export const useApi = () => {
	const getPatch = useCallback(
		async (idOrSlug?: string): Promise<Patch | undefined> => {
			if (!idOrSlug) {
				return undefined;
			}

			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			};
			try {
				return await fetch(`${apiBase}/patch/${idOrSlug}`, {
					headers,
					method: 'get',
				}).then((res) => res.json());
			} catch (error) {
				console.error(error);
			}

			return undefined;
		},
		[],
	);

	return { getPatch };
};
