import * as React from 'react';
import { Track } from '../components/track';
import { ModuleProps } from '../components/module';
import { createDelay, createOscillator, createDistortion, createFilter, createReverb } from '../contexts/module/module-factories';

export const SynthKitchen: React.FunctionComponent = () => {
	const moduleMatrix: ModuleProps[][] = [[
		createOscillator(),
		createDelay()], [
		createDistortion(),
		createFilter()], [
		createReverb()
	]];
	return (
		<React.Fragment>
			<ul id="kitchen">
				<h1>Kitchen</h1>
				{moduleMatrix.map((moduleList, index) =>
					<Track key={index} modules={moduleList} />
				)}
			</ul>
		</React.Fragment>
	);
}