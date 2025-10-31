import { domToDataUrl } from 'modern-screenshot';
import { Module, ModulePosition } from 'synth.kitchen-shared';
import { convertRemToPixels } from '../../../../shared/utils';

const rems20 = convertRemToPixels(20);

export const recomputeOverview = async (
	sortedModules: [Module, ModulePosition][],
) => {
	const main = document.getElementById('main');
	if (!main) {
		return {
			width: 1,
			height: 1,
			dataUrl:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+hHgAFgwJ/lWq6ZgAAAABJRU5ErkJggg==',
		};
	}

	let maxX = 0,
		maxY = 0;

	sortedModules.forEach(([, [x, y]]) => {
		if (x > maxX) {
			maxX = x;
		}
		if (y > maxY) {
			maxY = y;
		}
	});

	const width = maxX + rems20;
	const height = maxY + rems20;
	const dataUrl = await domToDataUrl(main, {
		quality: 0.01,
		width,
		height,
		filter: (el) => {
			const element = el as HTMLElement;
			return (
				element.id !== 'connections' &&
				element.id !== 'add-module' &&
				element.id !== 'spacer' &&
				element.id !== 'selection' &&
				(!element.dataset?.omit || sortedModules.length < 20)
			);
		},
	});
	return { width, height, dataUrl };
};
