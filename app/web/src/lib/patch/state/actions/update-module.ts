import { Module } from 'synth.kitchen-shared';

type IModuleUpdate = Partial<Omit<Module, 'moduleKey' | 'type'>>;

export type IUpdateModule = {
	type: 'UpdateModule';
	payload: {
		moduleKey: string;
		update: IModuleUpdate;
	};
};

export const updateModuleAction = (
	moduleKey: string,
	update: IModuleUpdate,
): IUpdateModule => ({
	type: 'UpdateModule',
	payload: {
		moduleKey,
		update,
	},
});
