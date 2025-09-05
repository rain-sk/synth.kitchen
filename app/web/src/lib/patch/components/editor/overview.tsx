import {
	MouseEvent,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useEffectOnce, useScroll } from 'react-use';
import { Module, ModulePosition } from 'synth.kitchen-shared';

import { PatchContext } from '../../contexts/patch';
import { patchActions } from '../../state/actions';
import { positionFromMouseEvent } from './utils/position-from-mouse-event';
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

	const scrubRatio = scrubWidth / scrubHeight;
	const overviewRatio = overviewSize.width / overviewSize.height;

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

	const normalizedTop = scrubContainer.clientHeight * relativeTop;
	const normalizedLeft = scrubContainer.clientWidth * relativeLeft;
	const normalizedRight = scrubContainer.clientWidth * relativeRight;
	const normalizedBottom = scrubContainer.clientHeight * relativeBottom;

	// TODO: cut the box off at the edge of the container
	return {
		top: normalizedTop,
		left: normalizedLeft,
		right: normalizedRight,
		bottom: normalizedBottom,
	};
};

export const Overview: React.FC<{
	connectionsCount: number;
	modulesCount: number;
	sortedModules: [Module, ModulePosition][];
}> = ({ connectionsCount, modulesCount, sortedModules }) => {
	const { dispatch } = useContext(PatchContext);
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
			}, 150);
			delayedUpdateRef.current = timeout;
		}
	}, [connectionsCount, modulesCount, sortedModules]);

	const onFocus = useCallback(() => {}, []);

	const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (containerRef.current && mainRef.current) {
			containerRef.current.focus();
			dispatch(patchActions.selectionDragCancelAction());
			dispatch(patchActions.clearActiveConnectorAction());
			dispatch(patchActions.deselectAllModulesAction());
		}
	}, []);

	return (
		<div
			ref={(div) => {
				containerRef.current = div ?? undefined;
			}}
			id="overview"
			tabIndex={0}
			onClick={onClick}
			onFocus={onFocus}
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
