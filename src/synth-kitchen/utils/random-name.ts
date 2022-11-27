import generate from 'project-name-generator';

export const randomName = (customNoun?: string): string => {
	if (!customNoun) {
		return generate({ words: 3, alliterative: true }).dashed;
	} else {
		const randomName = generate({ words: 3 }).raw;
		randomName[2] = customNoun;
		return randomName.join('-');
	}
};
