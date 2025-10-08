import type {
	ConnectionsState,
	Module,
	ModulePosition,
	UserInfo,
} from 'synth.kitchen-shared';

export type ISerializedPatch = {
	id: string;
	name: string;
	slug: string;
	creator?: UserInfo;
	modules: Record<string, Module>;
	modulePositions: Record<string, ModulePosition>;
	connections: ConnectionsState;
};
