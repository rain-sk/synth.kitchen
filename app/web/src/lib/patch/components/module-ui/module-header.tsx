import { useState } from 'react';
import { Module, randomName } from 'synth.kitchen-shared';
import { ModuleMenu } from './module-menu';

export const ModuleHeader: React.FC<{ module: Module }> = ({ module }) => {
	const [_] = useState(() => randomName(module.type.toLocaleLowerCase()));
	return (
		<>
			<h2 data-omit>
				{module.name ? module.name : module.type.toLocaleLowerCase()}
			</h2>
			<ModuleMenu />
		</>
	);
};
