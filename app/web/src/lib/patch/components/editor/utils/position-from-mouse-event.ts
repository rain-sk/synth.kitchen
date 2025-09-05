import { ModulePosition } from 'synth.kitchen-shared';

export const positionFromMouseEvent = (
	e: MouseEvent,
	scrollableElement: HTMLElement,
): ModulePosition => [
	e.clientX + scrollableElement.scrollLeft,
	e.clientY + scrollableElement.scrollTop,
];
