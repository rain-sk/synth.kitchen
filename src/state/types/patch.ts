import { IModule } from './module';

export interface IPatch {
	name: string;
	modules: Record<string, IModule>;
	connections?: any;
}
