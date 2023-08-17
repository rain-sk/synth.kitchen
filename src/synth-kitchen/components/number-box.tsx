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

	const [tempValue, setTempValue] = useState<string | void>();

	const valueToCommit = useCallback(() => {
		return tempValue ? parseFloat(tempValue) : value;
	}, [tempValue, value]);

	const onFocus = useCallback(() => {
		dispatch(disableKeyMovementAction());
		setTempValue(`${value}`);
	}, [dispatch, disableKeyMovementAction, setTempValue, value]);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const string = e.target.value.trim();
			if (string === '') {
				setTempValue(string);
				return;
			}

			const negative = string[0] === '-';

			let onlyNumeric = `${negative ? '-' : ''}${string.replace(
				/[^\d.]/g,
				''
			)}`;
			const indexOfFirstDecimal = onlyNumeric.indexOf('.');
			if (indexOfFirstDecimal > -1) {
				onlyNumeric = `${onlyNumeric.slice(
					0,
					indexOfFirstDecimal
				)}.${onlyNumeric.slice(indexOfFirstDecimal).replace(/[^\d]/g, '')}`;
			}

			const newValue = negative
				? -parseFloat(onlyNumeric)
				: parseFloat(onlyNumeric);

			setTempValue(isNaN(newValue) ? tempValue : onlyNumeric);
		},
		[setTempValue, tempValue]
	);

	const onBlur = useCallback(() => {
		commitValueCallback(valueToCommit());
		setTempValue();
		dispatch(enableKeyMovementAction());
	}, [
		commitValueCallback,
		valueToCommit,
		setTempValue,
		dispatch,
		enableKeyMovementAction
	]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				commitValueCallback(valueToCommit());
				(e.target as any).select();
			} else if (e.key === 'Escape') {
				setTempValue(`${value}`);
				setTimeout(() => (e.target as any).select(), 1);
			} else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				commitValueCallback(valueToCommit());
			}
		},
		[commitValueCallback, valueToCommit, setTempValue, value]
	);

	return (
		<label>
			{name}
			<input
				type="text"
				value={tempValue ?? value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
		</label>
	);
};
