import { ISerializedPatch } from './state/types/serialized-patch';

export class PatchService {
	static all = async () => {
		try {
			const response = await fetch('/api/patch');
			const patches = await response.json();
			return patches as ISerializedPatch[];
		} catch (e) {
			console.error(e);
		}
		return undefined;
	};

	static create = async (newPatch: ISerializedPatch) => {
		try {
			const response = await fetch('/api/patch', {
				method: 'POST',
				body: JSON.stringify(newPatch),
			});
			const patch = await response.json();
			console.log({ patch });
			return patch as ISerializedPatch;
		} catch (e) {
			console.error(e);
		}
		return undefined;
	};
}
