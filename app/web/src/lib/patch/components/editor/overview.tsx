import {
	RefObject,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useEffectOnce, useScroll } from 'react-use';
import { Module, ModulePosition } from 'synth.kitchen-shared';

import { recomputeOverview } from './utils/recompute-overview';
import { useRefBackedState } from '../../../shared/utils';

const main = () => document.getElementById('patch');
// The minimap fits the snapshot into the scrub box with `background-size: contain`, so the world -> scrub
// mapping is ONE uniform scale plus a letterbox offset. The old version divided x by scrubWidth and y by
// scrubHeight separately, against a reference frame built from a hardcoded 16/9, which destroyed the aspect
// ratio: at a 1663x392 viewport over a 1963x652 world the rectangle measured 381x132.6 where the correct box
// is 322.7x60.6 - twice too tall, and pinned to the full width
const computeVisibleBounds = (
	main: HTMLElement,
	scrubContainer: HTMLDivElement,
	snapshot?: { width: number; height: number },
) => {
	const { scrollTop, scrollLeft, clientHeight, clientWidth } = main;

	const scrubWidth = scrubContainer.clientWidth;
	const scrubHeight = scrubContainer.clientHeight;

	const useSnapshot = !!snapshot && snapshot.width > 1 && snapshot.height > 1;
	const worldWidth = useSnapshot ? snapshot!.width : main.scrollWidth;
	const worldHeight = useSnapshot ? snapshot!.height : main.scrollHeight;

	if (!worldWidth || !worldHeight || !scrubWidth || !scrubHeight) {
		return { top: 0, left: 0, right: 0, bottom: 0 };
	}

	const scale = Math.min(scrubWidth / worldWidth, scrubHeight / worldHeight);

	// contain centres the letterboxed snapshot, so the rectangle has to start from the same offset or it
	// drifts away from the image it is supposed to be framing
	const offsetX = (scrubWidth - worldWidth * scale) / 2;
	const offsetY = (scrubHeight - worldHeight * scale) / 2;

	const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));

	const viewLeft = clamp(scrollLeft, worldWidth);
	const viewTop = clamp(scrollTop, worldHeight);
	const viewRight = clamp(scrollLeft + clientWidth, worldWidth);
	const viewBottom = clamp(scrollTop + clientHeight, worldHeight);

	const left = clamp(offsetX + viewLeft * scale, scrubWidth);
	const top = clamp(offsetY + viewTop * scale, scrubHeight);
	const right = clamp(offsetX + viewRight * scale, scrubWidth);
	const bottom = clamp(offsetY + viewBottom * scale, scrubHeight);

	return { top, left, right, bottom };
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

	// measured after paint, not during a memo. The collapsed box is 2.667rem wide, so a memo that also
	// left expanding out of its deps computed the rectangle once against a collapsed or zero-sized box and
	// never recomputed it - the outline came back 0x0, which the border then rendered as a 16px square
	const [visibleBounds, setVisibleBounds] = useState({
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	});

	useLayoutEffect(() => {
		const patch = mainRef.current;
		const scrub = scrubRef.current;

		if (!patch || !scrub) {
			return;
		}

		setVisibleBounds(computeVisibleBounds(patch, scrub, overviewSize));
	}, [
		connectionsCount,
		modulesCount,
		sortedModules,
		scroll,
		overviewSize,
		minimized,
	]);

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
						top: `${visibleBounds.top}px`,
						left: `${visibleBounds.left}px`,
						width: `${visibleBounds.right - visibleBounds.left}px`,
						height: `${visibleBounds.bottom - visibleBounds.top}px`,
					}}
				/>
			</span>
		</div>
	);
};
