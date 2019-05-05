
export interface IoState {
	activePrimary: false | string;
	activeSecondary: false | string;
	outerMap: Map<string, string[]>;
	innerMap: Map<string, [any, any]>;
	ioNodes: Map<string, any>;
	active: boolean
}

export const initialIoState: IoState = {
	activePrimary: false,
	activeSecondary: false,
	outerMap: new Map<string, string[]>(),
	innerMap: new Map<string, [any, any]>(),
	ioNodes: new Map<string, any>(),
	active: false
};
