export type ILoadFromCloud = {
	type: 'LoadFromCloud';
};

export const loadFromCloudAction = (): ILoadFromCloud => ({
	type: 'LoadFromCloud',
});
