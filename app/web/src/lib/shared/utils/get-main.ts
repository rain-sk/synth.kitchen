const main = () => document.getElementById('main');

let knownMain: HTMLElement | null = main();
export const getMain = (): Promise<HTMLElement> => {
	return new Promise<HTMLElement>((resolve) => {
		(function checkForMain() {
			const newMain = main();
			if (newMain && newMain !== knownMain) {
				knownMain = newMain;
			}
			if (knownMain) {
				resolve(knownMain);
			} else {
				setTimeout(checkForMain, 2);
			}
		})();
	});
};
