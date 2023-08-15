import React, { useCallback, useState } from 'react';
import {
	IAudioContext,
	IAudioNode,
	IAudioParam
} from 'standardized-audio-context';

type IoAccessor = (key: string) => IAudioNode<IAudioContext> | undefined;
type ParamAccessor = (key: string) => IAudioParam | undefined;

const initModuleContextValue = {
	inputAccessor: undefined as IoAccessor | undefined,
	outputAccessor: undefined as IoAccessor | undefined,
	paramAccessor: undefined as ParamAccessor | undefined,
	setInputAccessor: (inputAccessor: IoAccessor) => {},
	setOutputAccessor: (outputAccessor: IoAccessor) => {},
	setParamAccessor: (paramAccessor: ParamAccessor) => {}
};

export const ModuleContext = React.createContext(initModuleContextValue);

export const ModuleContextProvider: React.FunctionComponent<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [state, setState] = useState(initModuleContextValue);

	const setInputAccessor = (inputAccessor: IoAccessor) => {
		setState({ ...state, inputAccessor });
	};
	const setOutputAccessor = (outputAccessor: IoAccessor) => {
		setState({ ...state, outputAccessor });
	};
	const setParamAccessor = (paramAccessor: ParamAccessor) => {
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
