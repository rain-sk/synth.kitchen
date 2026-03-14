import {
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useEffectOnce, useScroll } from 'react-use';
import { Module, ModulePosition } from 'synth.kitchen-shared';

import { OverviewCanvas } from './overview-canvas';
import {
	convertRemToPixels,
	useRefBackedState,
} from '../../../../shared/utils';

const main = () => document.getElementById('patch');
const point5Rem = convertRemToPixels(0.5);

const computeVisibleBounds = (
	main: HTMLElement,
	scrubContainer: HTMLDivElement,
	overviewSize: {
		width: number;
		height: number;
	},
) => {
	const {
		scrollTop: mainScrollY,
		scrollLeft: mainScrollX,
		clientHeight: mainHeight,
		clientWidth: mainWidth,
	} = main;
	const { clientHeight: scrubHeight, clientWidth: scrubWidth } = scrubContainer;

	console.log('[computeVisibleBounds] main element:', {
		scrollX: mainScrollX,
		scrollY: mainScrollY,
		width: mainWidth,
		height: mainHeight,
	});

	console.log('[computeVisibleBounds] scrub container:', {
		width: scrubWidth,
		height: scrubHeight,
	});

	const scrubRatio = 16 / 9;
	const overviewRatio = overviewSize.width / overviewSize.height;

	console.log('[computeVisibleBounds] ratios:', {
		scrubRatio,
		overviewRatio,
	});

	const relativeHeight =
		scrubRatio > overviewRatio
			? overviewSize.height
			: (scrubRatio / overviewRatio) * overviewSize.height;
	const relativeWidth =
		scrubRatio > overviewRatio
			? (scrubRatio / overviewRatio) * overviewSize.width
			: overviewSize.width;
	const relativeTop = mainScrollY / relativeHeight;
	const relativeLeft = mainScrollX / relativeWidth;
	const relativeRight = (mainScrollX + mainWidth) / relativeWidth;
	const relativeBottom = (mainScrollY + mainHeight) / relativeHeight;

	console.log('[computeVisibleBounds] relative bounds:', {
		relativeLeft,
		relativeTop,
		relativeRight,
		relativeBottom,
	});

	const normalizedTop = scrubHeight * relativeTop;
	const normalizedLeft = scrubWidth * relativeLeft;
	const normalizedRight = scrubWidth * relativeRight;
	const normalizedBottom = scrubHeight * relativeBottom;

	console.log('[computeVisibleBounds] normalized bounds:', {
		top: normalizedTop,
		left: normalizedLeft,
		right: normalizedRight,
		bottom: normalizedBottom,
	});

	const constrainedLeft = Math.max(
		0,
		Math.min(normalizedLeft, scrubContainer.clientWidth - point5Rem),
	);
	const constrainedRight = Math.min(
		normalizedRight,
		scrubContainer.clientWidth,
	);
	const constrainedTop = Math.max(
		0,
		Math.min(normalizedTop, scrubContainer.clientHeight - point5Rem),
	);
	const constrainedBottom = Math.min(
		normalizedBottom,
		scrubContainer.clientHeight,
	);

	console.log('[computeVisibleBounds] final bounds:', {
		top: constrainedTop,
		left: constrainedLeft,
		right: constrainedRight,
		bottom: constrainedBottom,
	});

	return {
		top: constrainedTop,
		left: constrainedLeft,
		right: constrainedRight,
		bottom: constrainedBottom,
	};
};

const noop = () => {};

export const Overview: React.FC<{
	connectionsCount: number;
	modulesCount: number;
	sortedModules: [Module, ModulePosition][];
}> = ({ connectionsCount, modulesCount, sortedModules }) => {
	const [minimized, setMinimized] = useState(true);
	const containerRef = useRef<HTMLDivElement>(undefined);
	const scrubRef = useRef<HTMLDivElement>(undefined);
	const [mainRef, setMainRef] = useState<RefObject<HTMLElement>>({
		current: null,
	});
	const [overviewSize, setOverviewSize] = useState({ width: 1, height: 1 });

	useEffect(() => {
		console.log('[Overview] overviewSize updated:', overviewSize);
	}, [overviewSize]);
	const scroll = useScroll(mainRef);

	useEffect(() => {
		if (overviewSize.width > 1 || overviewSize.height > 1) {
			console.log('[Overview] overviewSize:', overviewSize);
		}
	}, [overviewSize]);

	const visibleBounds = useMemo(() => {
		if (mainRef.current && containerRef.current) {
			return computeVisibleBounds(
				mainRef.current,
				containerRef.current,
				overviewSize,
			);
		} else {
			return { top: 0, left: 0, right: 0, bottom: 0 };
		}
	}, [connectionsCount, modulesCount, sortedModules, scroll, overviewSize]);

	const delayedUpdateRef = useRef<any>();
	useEffect(() => {
		const node = main();
		if (node) {
			if (delayedUpdateRef.current) {
				clearTimeout(delayedUpdateRef.current);
			}
			const timeout = setTimeout(() => {
				const rect = node.getBoundingClientRect();
				setOverviewSize({ width: rect.width, height: rect.height });
				console.log('[Overview] canvas size computed:', {
					width: rect.width,
					height: rect.height,
				});
				clearTimeout(timeout);
				delayedUpdateRef.current = null;
			}, 500);
			delayedUpdateRef.current = timeout;
		}
	}, [connectionsCount, modulesCount, sortedModules, minimized]);

	const [draggingRef, dragging, setDragging] = useRefBackedState(false);
	const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (draggingRef.current || !(e.buttons & 1)) {
			return;
		}
		setDragging(true);

		const onMouseMove = (e: MouseEvent) => {
			if (!(e.buttons & 1)) {
				setDragging(false);
				document.removeEventListener('mousemove', onMouseMove);
				return;
			}
		};
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', () => {
			setDragging(false);
			document.removeEventListener('mousemove', onMouseMove);
		});
	}, []);

	const handleClick = useCallback(() => {
		setMinimized(!minimized);
	}, [minimized]);

	const handleScroll = useCallback(
		(e: Event) => {
			if (draggingRef.current) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		[draggingRef],
	);

	document.addEventListener('scroll', handleScroll, true);

	useEffectOnce(() => {
		const interval = setInterval(() => {
			const element = main();
			if (element) {
				clearInterval(interval);
				setMainRef({ current: element });
			}
		}, 16);
	});

	const classNames = [];
	if (minimized) {
		classNames.push('minimized');
	}
	if (dragging) {
		classNames.push('dragging');
	}

	console.log('[Overview] rendering with overviewSize:', overviewSize);
	const container = document.getElementById('scrub-area');
	const mainEl = document.getElementById('patch');
	if (container && mainEl) {
		const containerRect = container.getBoundingClientRect();
		const mainRect = mainEl.getBoundingClientRect();
		console.log('[Overview] scrub container size:', {
			containerWidth: containerRect.width,
			containerHeight: containerRect.height,
			mainWidth: mainRect.width,
			mainHeight: mainRect.height,
		});
	}
	return (
		<div
			ref={(div) => {
				containerRef.current = div ?? undefined;
			}}
			id="overview"
			tabIndex={0}
			onMouseDown={onMouseDown}
			onClick={minimized ? handleClick : noop}
			className={classNames.join(' ')}
		>
			<span>
				{!minimized && (
					<button type="button" onClick={handleClick}>
						<span className="visually-hidden">minimize</span>
						<span role="presentation">-</span>
					</button>
				)}
				<div
					id="scrub-area"
					ref={(scrub) => {
						scrubRef.current = scrub ?? undefined;
					}}
				>
					<OverviewCanvas modules={sortedModules} forceScale={1} />
				</div>
				<div
					id="scrub-outline"
					style={{
						top: `${Math.min(
							visibleBounds.top,
							(scrubRef.current?.clientHeight ?? 0) -
								(visibleBounds.bottom - visibleBounds.top),
						)}px`,
						left: `${Math.min(
							visibleBounds.left,
							(scrubRef.current?.clientWidth ?? 0) -
								(visibleBounds.right - visibleBounds.left),
						)}px`,
						width: `${visibleBounds.right - visibleBounds.left}px`,
						height: `${visibleBounds.bottom - visibleBounds.top}px`,
					}}
				/>
			</span>
		</div>
	);
};
