import * as React from 'react';
import { KitchenContext } from '../flux';
import { ioRegister } from '../flux/actions/io';
import { mouseClick, mouseDown, mouseUp } from '../flux/actions';

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
	const { dispatch } = React.useContext(KitchenContext);
	React.useEffect(() => {
		dispatch(ioRegister(props.guid, !!props.accessor ? props.target[props.accessor] : props.target));
	});
	const onClick = () => {
		dispatch(mouseClick(props.guid));
	};
	const onMouseDown = () => {
		dispatch(mouseDown(props.guid));
	};
	const onMouseUp = () => {
		dispatch(mouseUp(props.guid));
	};
	return (
		<li className="io">
			<button type="button" data-name={props.name} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
				{props.children}
			</button>
		</li>
	)
}