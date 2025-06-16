import { IModule } from '../types/module';

type IModuleUpdate = Partial<Omit<IModule, 'moduleKey' | 'type'>>;

export type IUpdateModule = {
	type: 'UpdateModule';
	payload: {
		moduleKey: string;
		update: IModuleUpdate;
	};
};

export const updateModuleAction = (
	moduleKey: string,
	update: IModuleUpdate
): IUpdateModule => ({
	type: 'UpdateModule',
	payload: {
		moduleKey,
		update
	}
});
