import { IInput, IOutput } from '../../contexts/connection';
import { IModule } from './module';
import { Position } from './patch';

export interface ISerializedPatch {
	id: string;
	name: string;
	modules: Record<string, IModule>;
	modulePositions: Record<string, Position>;
	connections: Record<string, [IOutput, IInput]>;
}
