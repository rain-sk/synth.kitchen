import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { PatchState } from 'synth.kitchen-shared';
import { MD5 } from '../../../shared/utils/md5';

type HistorySnapshot = {
	md5: string;
	state: string;
};

export class History {
	constructor(
		private stack: HistorySnapshot[] = [],
		private registry = new Set<string>(),
	) {
		this.stack = this.stack.slice(0, 50);
		this.registry = new Set([...this.registry]);
	}

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

		if (this.stack[0] && this.stack[0].md5 === md5) {
			// cache hit
			return this;
		}

		if (Object.values(state.modules).some((module) => !module.state)) {
			// incomplete module state
			return this;
		}

		const snapshot: HistorySnapshot = {
			md5,
			state: compressed,
		};

		const history = new History(
			[snapshot, ...this.stack.slice(Math.max(0, historyPointer))],
			this.registry,
		);

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
