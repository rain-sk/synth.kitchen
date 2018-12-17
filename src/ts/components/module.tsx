import * as React from 'react';
import { IoProps, Io } from './io';

export interface ModuleProps {
	name: string;
	guid: string;
	node: any;
	params: IoProps[];
	inputs: IoProps[];
	mods: IoProps[];
	outputs: IoProps[];
}

export const Module: React.FunctionComponent<ModuleProps> = (props) => {
	return (
		<li className="module" tabIndex={0}>
			<h3>{props.name}</h3>
			<p>{props.name}</p>
			<ul className="inputs">
				{props.inputs.map((input, index) => (
					<Io key={index} {...input}>
						+
					</Io>
				))}
			</ul>
			<ul className="mods">
				{props.mods.map((mod, index) => (
					<Io key={index} {...mod}>
						~
					</Io>
				))}
			</ul>
			<ul className="outputs">
				{props.outputs.map((output, index) => (
					<Io key={index} {...output}>
						-
					</Io>
				))}
			</ul>
		</li>
	)
}