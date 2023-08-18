import React, { useCallback, useState } from 'react';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { disableKeyMovementAction } from '../state/actions/disable-key-movement';
import { enableKeyMovementAction } from '../state/actions/enable-key-movement';
import { randomId } from '../utils/random-id';

export const NumberBox: React.FunctionComponent<{
	name: string;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ name, value, commitValueCallback }) => {
	const dispatch = useDispatchContext();

	const [id] = useState(() => randomId());
	const [tempValue, setTempValue] = useState<string | void>();

	const valueToCommit = useCallback(() => {
		return tempValue ? parseFloat(tempValue) : value;
	}, [tempValue, value]);

	const onFocus = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			dispatch(disableKeyMovementAction());
			setTempValue(`${value}`);
			e.target.select();
		},
		[dispatch, disableKeyMovementAction, setTempValue, value]
	);

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
		<span className="numbox">
			<label htmlFor={id}>
				<h3>{name}</h3>
			</label>
			<input
				id={id}
				type="text"
				value={tempValue ?? value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
		</span>
	);
};
