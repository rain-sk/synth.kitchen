import * as React from 'react';
import { InputInterfaceProps, OutputInterfaceProps, ModInterfaceProps, ParamInterfaceProps } from './io-interface';

export interface ModuleProps {
	node: AudioNode;
	guid: string;
	inputs: InputInterfaceProps[];
	outputs: OutputInterfaceProps[];
	mods: ModInterfaceProps[];
	params: ParamInterfaceProps[];
}

export const Module: React.FunctionComponent<ModuleProps> = (props) => {
	return null;
}