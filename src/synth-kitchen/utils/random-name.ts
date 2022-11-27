import generate from 'project-name-generator';

export const randomName = (): string => {
	return generate({ words: 3, alliterative: true }).dashed;
};
