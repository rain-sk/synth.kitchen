const main = () => document.getElementById('main');

export const getMain = (): Promise<HTMLElement> => {
	let timeout: any;
	let knownMain: HTMLElement | null = null;
	return new Promise<HTMLElement>((resolve) => {
		const checkForMain = () => {
			knownMain = knownMain ?? main();
			if (knownMain) {
				if (timeout) {
					clearTimeout(timeout);
				}
				return resolve(knownMain);
			}
			timeout = setTimeout(checkForMain, 2);
		};
		checkForMain();
	});
};
