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
import { convertRemToPixels, useRefBackedState } from '../../../shared/utils';

const main = () => document.getElementById('main');
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

			console.log(e.pageX, e.pageY);
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

	const classNames = [];
	if (minimized) {
		classNames.push('minimized');
	}
	if (dragging) {
		classNames.push('dragging');
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
