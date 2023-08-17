import React, { useContext } from 'react';
import { IModule } from '../state/types/module';
import { ModuleContext } from '../contexts/module';

export const ModuleOutputs: React.FunctionComponent<{
	module: IModule;
	outputs: string[];
}> = ({ outputs }) => {
	const { outputAccessor } = useContext(ModuleContext);

	if (outputAccessor) {
		return (
			<>
				{outputs.map((key: string) => (
					<p key={key}>{key}</p>
				))}
			</>
		);
	} else {
		return null;
	}
};
