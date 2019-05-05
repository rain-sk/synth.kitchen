import * as React from 'react';
import { Track } from './track';
import { ModuleProps } from './module';
import { GlobalOutput } from './global-output';
import { TextContext } from '../contexts/text';
import { AddTrack } from './add-track';
import { KitchenStore } from '../flux';
import { useFlux } from 'use-flux';

export const KitchenGridComponent: React.FunctionComponent = () => {
	const { state } = useFlux(KitchenStore);
	const text = React.useContext(TextContext);
	const moduleMatrix: (ModuleProps | undefined)[][] = state.modules.map(modules => modules.map(guid => state.moduleMap.get(guid)));
	return (
		<React.Fragment>
			<p>{state.ioNodes.size}</p>
			<ul className="kitchen-grid">
				<h1>{text.title}</h1>
				{moduleMatrix.map((moduleList, index) =>
					<Track key={index} modules={moduleList.filter(module => module !== undefined)} index={index} />
				)}
				<AddTrack />
			</ul>
			<GlobalOutput />
		</React.Fragment>
	);
}