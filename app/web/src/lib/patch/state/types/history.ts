import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { PatchState } from 'synth.kitchen-shared';
import { MD5 } from '../../../shared/utils/md5';

type HistorySnapshot = {
	md5: string;
	state: string;
};

export class History {
	private stack: HistorySnapshot[] = [];
	private registry = new Set<string>();

	slice = (historyPointer: number): History => {
		const history = new History();

		history.stack = this.stack.slice(Math.max(0, historyPointer));
		history.registry = new Set(history.stack.map((snapshot) => snapshot.md5));

		return history;
	};

	push = (state: PatchState, historyPointer: number): History => {
		const json = JSON.stringify(state);
		const compressed = compressToBase64(json);
		const md5 = MD5(compressed);

		if (this.registry.has(md5)) {
			return this;
		}

		const snapshot: HistorySnapshot = {
			md5,
			state: compressed,
		};

		const history = new History();

		history.stack = [
			snapshot,
			...this.stack.slice(Math.max(0, historyPointer)),
		].slice(0, 50);
		history.registry = new Set([md5, ...this.registry]);

		return history;
	};

	load = (historyPointer: number): PatchState => {
		const snapshot = this.stack[historyPointer];
		const json = decompressFromBase64(snapshot.state);
		return JSON.parse(json);
	};

	get length() {
		return this.stack.length;
	}
}
