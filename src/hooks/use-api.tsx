import { useCallback, useEffect, useRef, useState } from 'react';
import { apiToken } from '../utils/token';
import { bearerPrefix } from '../utils/bearer-prefix';
import { ISerializedPatch } from '../patch/state/types/serialized-patch';

type TokenResponse = {
	app_name: string;
	access_token: string;
	dtable_uuid: string;
	dtable_server: string;
	dtable_socket: string;
	dtable_db: string;
	workspace_id: number;
	dtable_name: string;
};

export type DatabasePatch = {
	ID: string;
	Name: string;
	Patch: string;
	_id: string;
};

const getTokenOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		authorization: bearerPrefix(apiToken()),
	},
};

export const useApi = () => {
	const [token, setToken] = useState<TokenResponse>();
	const tokenRef = useRef<TokenResponse>();
	const updateAccessToken = useCallback(async () => {
		return fetch(
			'https://cloud.seatable.io/api/v2.1/dtable/app-access-token/',
			getTokenOptions,
		)
			.then((res) => res.json())
			.then((res) => {
				tokenRef.current = res;
				setToken(tokenRef.current);
				return res;
			});
	}, []);

	useEffect(() => {
		updateAccessToken().catch((err) => console.error(err));
	}, [updateAccessToken]);

	const getPatches = useCallback(async () => {
		tokenRef.current = tokenRef.current ?? (await updateAccessToken());

		if (!tokenRef.current) {
			return;
		}

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				authorization: bearerPrefix(tokenRef.current.access_token),
			},
		};

		return fetch(
			`https://cloud.seatable.io/api-gateway/api/v2/dtables/${tokenRef.current.dtable_uuid}/rows/?table_name=synth.kitchen-patch&convert_keys=true`,
			options,
		).catch((err) => console.error(err));
	}, [updateAccessToken, token]);

	const savePatch = useCallback(
		async (patch: ISerializedPatch) => {
			tokenRef.current = tokenRef.current ?? (await updateAccessToken());
			if (!tokenRef.current) {
				return;
			}

			const data: { rows: DatabasePatch[] } = await getPatches().then(
				(res) => res && res.json(),
			);

			const match = data.rows.find((row) => row.ID === patch.id);

			if (match) {
				const options = {
					method: 'PUT',
					headers: {
						accept: 'application/json',
						'content-type': 'application/json',
						authorization: bearerPrefix(tokenRef.current.access_token),
					},
					body: JSON.stringify({
						table_name: 'synth.kitchen-patch',
						updates: [
							{
								row: {
									Name: patch.name,
									Patch: JSON.stringify(patch),
								},
								row_id: match._id,
							},
						],
					}),
				};

				return fetch(
					`https://cloud.seatable.io/api-gateway/api/v2/dtables/${tokenRef.current.dtable_uuid}/rows/`,
					options,
				).catch((err) => console.error(err));
			} else {
				const options = {
					method: 'POST',
					headers: {
						accept: 'application/json',
						'content-type': 'application/json',
						authorization: bearerPrefix(tokenRef.current.access_token),
					},
					body: JSON.stringify({
						rows: [
							{
								ID: patch.id,
								Name: patch.name,
								Patch: JSON.stringify(patch),
							},
						],
						table_name: 'synth.kitchen-patch',
					}),
				};

				return fetch(
					`https://cloud.seatable.io/api-gateway/api/v2/dtables/${tokenRef.current.dtable_uuid}/rows/`,
					options,
				).catch((err) => console.error(err));
			}
		},
		[updateAccessToken, token],
	);

	return { getPatches, savePatch };
};
