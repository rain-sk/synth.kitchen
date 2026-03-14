import { Module } from 'synth.kitchen-shared';
import { MODULE_COLORS } from './utils/module-colors';

export const SvgModule: React.FC<{
	module: Module;
	x: number;
	y: number;
}> = ({ module, x, y }) => {
	return (
		<rect
			x={x}
			y={y}
			width={120}
			height={80}
			fill={MODULE_COLORS[module.type]}
			rx={4}
			stroke="#333"
			strokeWidth={1}
		/>
	);
};

export default SvgModule;
