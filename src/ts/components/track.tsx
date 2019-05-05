import * as React from 'react';
import { Module } from './module';
import { ModuleProps } from './module';
import { AddModule } from './add-module';

export interface TrackProps {
	index: number;
	modules: (ModuleProps | undefined)[];
}

export const Track: React.FunctionComponent<TrackProps> = (props) => {
	return (
		<li className="track">
			<ul>
				<h2>{props.modules.filter(module => module !== undefined).map(module => module ? module.name : null).join(',')}</h2>
				{props.modules.map((module, index) => (
					module
						? <Module key={index} trackIndex={props.index} index={index} {...module} />
						: null
				))}
				<AddModule trackIndex={props.index} index={props.modules.length} />
			</ul>
		</li>
	)
}