import * as React from 'react';

export interface IoProps {
	name: string;
	guid: string;
	target?: any;
	accessor?: string;
	options?: string[];
	getter?: () => number;
	setter?: (value: number) => void;
}

export const Io: React.FunctionComponent<IoProps> = (props) => {
	return (
		<li className="io">
			<button type="button" data-name={props.name}>
				{props.children}
			</button>
		</li>
	)
}