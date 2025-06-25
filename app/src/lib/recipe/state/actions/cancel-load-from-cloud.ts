export type ICancelLoadFromCloud = {
	type: 'CancelLoadFromCloud';
};

export const cancelLoadFromCloudAction = (): ICancelLoadFromCloud => ({
	type: 'CancelLoadFromCloud',
});
