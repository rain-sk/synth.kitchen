import React, { useState } from 'react';
import {
	IAudioContext,
	IAudioNode,
	IAudioParam
} from 'standardized-audio-context';

type IIoAccessor = (key: string) => IAudioNode<IAudioContext> | undefined;
type IParamAccessor = (key: string) => IAudioParam | undefined;

type IIoAccessorSetter = (inputAccessor: IIoAccessor) => void;
type IParamAccessorSetter = (paramAccessor: IParamAccessor) => void;

const initModuleContextValue = {
	inputAccessor: undefined as IIoAccessor | undefined,
	outputAccessor: undefined as IIoAccessor | undefined,
	paramAccessor: undefined as IParamAccessor | undefined,
	setInputAccessor: (() => {}) as any as IIoAccessorSetter,
	setOutputAccessor: (() => {}) as any as IIoAccessorSetter,
	setParamAccessor: (() => {}) as any as IParamAccessorSetter
};

export const ModuleContext = React.createContext(initModuleContextValue);

export const ModuleContextProvider: React.FunctionComponent<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [state, setState] = useState(initModuleContextValue);

	const setInputAccessor = (inputAccessor: IIoAccessor) => {
		setState({ ...state, inputAccessor });
	};
	const setOutputAccessor = (outputAccessor: IIoAccessor) => {
		setState({ ...state, outputAccessor });
	};
	const setParamAccessor = (paramAccessor: IParamAccessor) => {
		setState({ ...state, paramAccessor });
	};

	return (
		<ModuleContext.Provider
			value={{
				...state,
				setInputAccessor,
				setOutputAccessor,
				setParamAccessor
			}}
		>
			{children}
		</ModuleContext.Provider>
	);
};
