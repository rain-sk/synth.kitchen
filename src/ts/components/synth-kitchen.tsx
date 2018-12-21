import * as React from 'react';
import { Track } from '../components/track';
import { ModuleProps } from '../components/module';
import { createDelay, createOscillator, createDistortion, createFilter, createReverb } from '../flux/module/module-factories';
import { GlobalOutput } from './global-output';
import { TextContext } from '../contexts/text';

export const SynthKitchen: React.FunctionComponent = () => {
	const text = React.useContext(TextContext);
	const moduleMatrix: ModuleProps[][] = [[
		createOscillator(),
		createDelay()], [
		createDistortion(),
		createFilter()], [
		createReverb()
	]];
	return (
		<React.Fragment>
			<ul className="kitchen-grid">
				<h1>{text.title}</h1>
				{moduleMatrix.map((moduleList, index) =>
					<Track key={index} modules={moduleList} />
				)}
			</ul>
			<GlobalOutput />
		</React.Fragment>
	);
}