export type IClearPatchEditor = {
	type: 'ClearPatchEditor';
};

export const clearPatchEditorAction = (): IClearPatchEditor => ({
	type: 'ClearPatchEditor',
});
