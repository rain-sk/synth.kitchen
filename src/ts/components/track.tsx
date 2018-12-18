import * as React from 'react';
import { Module } from './module';
import { ModuleProps } from './module';

export interface TrackProps {
	modules: ModuleProps[];
}

export const Track: React.FunctionComponent<TrackProps> = (props) => {
	return (
		<li className="track">
			<ul>
				<h2>{props.modules.map(module => module.name).join(',')}</h2>
				{props.modules.map((module, index) => (
					<Module key={index} {...module} />
				))}
			</ul>
		</li>
	)
}