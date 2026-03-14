import { Module, ModulePosition } from 'synth.kitchen-shared';
import { MODULE_COLORS } from './utils/module-colors';
import { getCanvasBounds } from './utils/scale-utils';

interface OverviewCanvasProps {
	modules: [Module, ModulePosition][];
	forceScale?: number;
}

const MODULE_SIZE = { width: 120, height: 80 };

const renderModule = (x: number, y: number, module: Module) => {
	return (
		<rect
			x={x}
			y={y}
			width={MODULE_SIZE.width}
			height={MODULE_SIZE.height}
			fill={MODULE_COLORS[module.type]}
			rx={4}
			stroke="#333"
			strokeWidth={1}
		/>
	);
};

export const OverviewCanvas: React.FC<OverviewCanvasProps> = ({ 
	modules, 
	forceScale,
}) => {
	const { width: canvasWidth, height: canvasHeight, minX, minY } = getCanvasBounds(modules, 20);
	
	if (canvasWidth === 0 || canvasHeight === 0) {
		return <svg width="0" height="0" />;
	}

	const scaleX = forceScale ?? 1;
	const scaleY = forceScale ?? 1;
	const scaleFactor = Math.min(scaleX, scaleY);

	console.log('[OverviewCanvas] render:', {
		canvasWidth,
		canvasHeight,
		minX,
		minY,
		forceScale,
		scaleFactor,
	});

	return (
		<svg
			width="100%"
			height="100%"
			viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
			preserveAspectRatio="xMidYMid meet"
		>
			{modules.map(([module, [x, y]]) => {
				return renderModule(x - minX, y - minY, module);
			})}
		</svg>
	);
};

export default OverviewCanvas;
