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

import { recomputeOverview } from './utils/recompute-overview';

const main = () => document.getElementById('main');

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

	// Get the
	const scrubRatio = 16 / 9;
	const overviewRatio = overviewSize.width / overviewSize.height;

	// Compute highlight's size and position relative to the actual patch
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

	// Normalize to the scrub container
	const normalizedTop = scrubHeight * relativeTop;
	const normalizedLeft = scrubWidth * relativeLeft;
	const normalizedRight = scrubWidth * relativeRight;
	const normalizedBottom = scrubHeight * relativeBottom;

	// Constrain to the scrub container
	const constrainedLeft = Math.min(
		normalizedLeft,
		scrubContainer.clientWidth - (normalizedRight - normalizedLeft),
	);
	const constrainedRight = Math.min(
		normalizedRight,
		scrubContainer.clientWidth,
	);
	const constrainedTop = Math.min(
		normalizedTop,
		scrubContainer.clientHeight - (normalizedBottom - normalizedTop),
	);
	const constrainedBottom = Math.min(
		normalizedBottom,
		scrubContainer.clientHeight,
	);

	return {
		top: constrainedTop,
		left: constrainedLeft,
		right: constrainedRight,
		bottom: constrainedBottom,
	};
};

export const Overview: React.FC<{
	connectionsCount: number;
	modulesCount: number;
	sortedModules: [Module, ModulePosition][];
}> = ({ connectionsCount, modulesCount, sortedModules }) => {
	const containerRef = useRef<HTMLDivElement>(undefined);
	const scrubRef = useRef<HTMLDivElement>(undefined);
	const [mainRef, setMainRef] = useState<RefObject<HTMLElement>>({
		current: null,
	});
	const [overviewSize, setOverviewSize] = useState({ width: 1, height: 1 });
	const scroll = useScroll(mainRef);
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

	useEffectOnce(() => {
		const interval = setInterval(() => {
			const element = main();
			if (element) {
				clearInterval(interval);
				setMainRef({ current: element });
			}
		}, 16);
	});

	const delayedUpdateRef = useRef<any>();
	useEffect(() => {
		const node = main();
		if (node) {
			if (delayedUpdateRef.current) {
				clearTimeout(delayedUpdateRef.current);
			}
			const timeout = setTimeout(async () => {
				const { width, height, dataUrl } = await recomputeOverview(
					sortedModules,
				);
				setOverviewSize({ width, height });
				if (scrubRef.current) {
					scrubRef.current.style.backgroundImage = `url(${dataUrl})`;
				}
				clearTimeout(timeout);
				delayedUpdateRef.current = null;
			}, 500);
			delayedUpdateRef.current = timeout;
		}
	}, [connectionsCount, modulesCount, sortedModules]);

	const draggingRef = useRef(false);
	const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (draggingRef.current || !(e.buttons & 1)) {
			return;
		}
		draggingRef.current = true;

		const onMouseMove = (e: MouseEvent) => {
			console.log(e.buttons);
			if (!(e.buttons & 1)) {
				draggingRef.current = false;
				document.removeEventListener('mousemove', onMouseMove);
				return;
			}

			console.log();
		};
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', () => {
			draggingRef.current = false;
			document.removeEventListener('mousemove', onMouseMove);
		});
	}, []);

	return (
		<div
			ref={(div) => {
				containerRef.current = div ?? undefined;
			}}
			id="overview"
			tabIndex={0}
			onMouseDown={onMouseDown}
		>
			<span>
				<div
					id="scrub-area"
					ref={(scrub) => {
						scrubRef.current = scrub ?? undefined;
					}}
				/>
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
