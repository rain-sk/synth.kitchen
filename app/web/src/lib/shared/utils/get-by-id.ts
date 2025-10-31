export const makeGetter = (id: string) => () => {
	let knownElement: HTMLElement | null = el();
	return new Promise<HTMLElement>((resolve) => {
		(function checkForElement() {
			const newElement = el();
			if (newElement && newElement !== knownElement) {
				knownElement = newElement;
			}
			if (knownElement) {
				resolve(knownElement);
			} else {
				setTimeout(checkForElement, 2);
			}
		})();
	});

	function el() {
		return document.getElementById(id);
	}
};
export const getMain = makeGetter('main');
