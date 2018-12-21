import * as React from 'react';
import { Text, defaultText } from './text/text';
import { TextContext } from './text';

export interface ContextWrapperProps {
	text?: Text;
}

export const ContextWrapper: React.FunctionComponent<ContextWrapperProps> = props => {
	if (props.text) {
		return (
			<TextContext.Provider value={props.text}>
				{props.children}
			</TextContext.Provider>
		)
	} else {
		return (
			<TextContext.Provider value={defaultText}>
				{props.children}
			</TextContext.Provider>
		)
	}
}
