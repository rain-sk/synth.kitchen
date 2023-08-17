import React, { useCallback, useState } from 'react';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { disableKeyMovementAction } from '../state/actions/disable-key-movement';
import { enableKeyMovementAction } from '../state/actions/enable-key-movement';

export const NumberBox: React.FunctionComponent<{
	name: string;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ name, value, commitValueCallback }) => {
	const dispatch = useDispatchContext();

	const [tempValue, setTempValue] = useState<number | void>();

	const onFocus = useCallback(() => {
		console.log('disable');
		dispatch(disableKeyMovementAction());
		setTempValue(value);
	}, [dispatch, disableKeyMovementAction, setTempValue, value]);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setTempValue(Number(e.target.value));
		},
		[setTempValue]
	);

	const onBlur = useCallback(() => {
		commitValueCallback(tempValue ?? value);
		setTempValue();
		dispatch(enableKeyMovementAction());
		console.log('enable');
	}, [
		commitValueCallback,
		tempValue,
		value,
		setTempValue,
		dispatch,
		enableKeyMovementAction
	]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				commitValueCallback(tempValue ?? value);
			} else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				commitValueCallback(tempValue ?? value);
			}
		},
		[commitValueCallback, tempValue, value]
	);

	return (
		<label>
			{name}
			<input
				type="number"
				value={tempValue ?? value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
		</label>
	);
};
