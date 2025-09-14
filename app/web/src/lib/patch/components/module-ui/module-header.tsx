import { Module } from 'synth.kitchen-shared';

export const ModuleHeader: React.FC<{ module: Module }> = ({ module }) => {
	return <h2 data-omit>{module.type.toLocaleLowerCase()}</h2>;
};
