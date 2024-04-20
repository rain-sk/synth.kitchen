import { IInput, IOutput } from '../../contexts/connection';
import { IModule } from './module';
import { Position } from './state';

export interface ISerializedPatch {
	name: string;
	modules: Record<string, IModule>;
	modulePositions: Record<string, Position>;
	connections: Record<string, [IOutput, IInput]>;
}
