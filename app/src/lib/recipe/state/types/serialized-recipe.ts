import type { UserInfo } from 'shared';

import { IInput, IOutput } from './connection';
import { IModule } from './module';
import { Position } from './recipe';

export type ISerializedRecipe = {
	id: string;
	name: string;
	chef?: UserInfo;
	modules: Record<string, IModule>;
	modulePositions: Record<string, Position>;
	connections: Record<string, [IOutput, IInput]>;
};
