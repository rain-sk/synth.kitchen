import generate from 'server-name-gen';

export const randomName = (customNoun?: string): string => {
	if (!customNoun) {
		return generate({ words: 3, alliterative: true, blocklist: ['slave'] })
			.dashed;
	} else {
		const randomName = generate({ words: 3 }).raw;
		randomName[2] = customNoun;
		return randomName.join('-');
	}
};
