import { ModulePosition } from 'synth.kitchen-shared';

export const positionFromMouseEvent = (
	e: MouseEvent,
	scrollableElement: HTMLElement,
): ModulePosition => [
	e.clientX +
		scrollableElement.scrollLeft -
		scrollableElement.getBoundingClientRect().x,
	e.clientY + scrollableElement.scrollTop,
];
