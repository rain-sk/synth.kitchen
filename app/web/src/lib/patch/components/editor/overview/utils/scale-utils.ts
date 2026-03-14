import { Module, ModulePosition } from 'synth.kitchen-shared';

export const calculateScaleFactor = (
	width: number,
	height: number,
	viewWidth: number,
	viewHeight: number,
): number => {
	console.log('[calculateScaleFactor] input:', { 
		width, 
		height, 
		viewWidth, 
		viewHeight 
	});
	const scaleX = viewWidth / width;
	const scaleY = viewHeight / height;
	const scaleFactor = Math.min(scaleX, scaleY);
	console.log('[calculateScaleFactor] result:', {
		scaleX,
		scaleY,
		scaleFactor,
	});
	return scaleFactor;
};

export const getCanvasBounds = (
	modules: [Module, ModulePosition][],
	paddingPx: number,
): { width: number; height: number; minX: number; minY: number } => {
	console.log('[getCanvasBounds] input:', { 
		modulesLength: modules.length, 
		paddingPx,
	});
	
	if (modules.length === 0) {
		return { width: 1, height: 1, minX: 0, minY: 0 };
	}

	let minX = Infinity;
	let maxX = -Infinity;
	let minY = Infinity;
	let maxY = -Infinity;

	modules.forEach(([, [x, y]]) => {
		if (x < minX) minX = x;
		if (x > maxX) maxX = x;
		if (y < minY) minY = y;
		if (y > maxY) maxY = y;
	});

	const rawWidth = maxX - minX;
	const rawHeight = maxY - minY;

	console.log('[getCanvasBounds] bounds before padding:', { 
		minX, 
		maxX, 
		minY, 
		maxY,
		rawWidth,
		rawHeight,
	});
	
	const width = rawWidth + paddingPx * 2;
	const height = rawHeight + paddingPx * 2;

	console.log('[getCanvasBounds] result:', { 
		width, 
		height, 
		minX, 
		minY,
		paddingApplied: { x: paddingPx, y: paddingPx },
	});

	return { width, height, minX, minY };
};
