import * as React from 'react';
import { IoButton } from './io-button';

export enum IoType {
	Input = 0,
	Output = 1,
	Mod = 2,
	Param = 3
}

export interface IoInterfaceTransform {
	(inputValue: number): number;
}

export interface IoInterfaceProps {
	guid: string;
	name: string;
	target?: any;
	accessor?: string;
	options?: string[] | [string, any][];
}

export interface InputInterfaceProps extends IoInterfaceProps {
	type: IoType.Input;
}
export interface OutputInterfaceProps extends IoInterfaceProps {
	type: IoType.Output;
}
export interface ModInterfaceProps extends IoInterfaceProps {
	type: IoType.Mod;
	range?: Range;
	getter?: () => AudioParam;
	setter?: (to: number) => void;
}
export interface ParamInterfaceProps extends IoInterfaceProps {
	type: IoType.Param;
	getter?: () => AudioParam;
	setter?: (to: number) => void;
}

//type IoProps = InputInterfaceProps | OutputInterfaceProps | ModInterfaceProps | ParamInterfaceProps;

export const IoInterface: React.FunctionComponent/*<IoProps>*/ = (props) => {
	return <IoButton />
}