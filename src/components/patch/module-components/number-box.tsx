import React, { useCallback, useState } from 'react';
import { patchActions } from '../../../state/actions';
import { randomId } from '../../../utils/random-id';
import { usePatch } from '../../../hooks/use-patch';

export const NumberBox: React.FunctionComponent<{
	name: string;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ name, value, commitValueCallback }) => {
	const { dispatch } = usePatch();

	const [id] = useState(() => randomId());
	const [tempValue, setTempValue] = useState<string | void>();

	const valueToCommit = useCallback(() => {
		return tempValue ? parseFloat(tempValue) : value;
	}, [tempValue, value]);

	const onFocus = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			dispatch(patchActions.disableKeyMovementAction());
			setTempValue(`${value}`);
			e.target.select();
		},
		[dispatch, setTempValue, value],
	);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const string = e.target.value.trim();
			if (string === '') {
				setTempValue(string);
				return;
			}

			const negative =
				string[0] === '-' || (string[0] === '0' && string[1] === '-');

			if (
				string.length === 1 &&
				(negative || string[0] === '.' || string[0] === ',')
			) {
				setTempValue(negative ? '-' : '.');
				return;
			}

			let onlyNumeric = `${negative ? '-' : ''}${string
				.replace(',', '.')
				.replace(/[^\d.]/g, '')}`;
			const indexOfFirstDecimal = onlyNumeric.indexOf('.');
			if (indexOfFirstDecimal > -1) {
				onlyNumeric = `${onlyNumeric.slice(
					0,
					indexOfFirstDecimal,
				)}.${onlyNumeric.slice(indexOfFirstDecimal).replace(/[^\d]/g, '')}`;
			}

			const newValue = negative
				? -parseFloat(onlyNumeric)
				: parseFloat(onlyNumeric);

			setTempValue(isNaN(newValue) ? tempValue : onlyNumeric);
		},
		[setTempValue, tempValue],
	);

	const onBlur = useCallback(() => {
		commitValueCallback(valueToCommit());
		setTempValue();
		dispatch(patchActions.enableKeyMovementAction());
	}, [commitValueCallback, dispatch, setTempValue, valueToCommit]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				commitValueCallback(valueToCommit());
				(e.target as any).select();
			} else if (e.key === 'Escape') {
				setTempValue(`${value}`);
				setTimeout(() => (e.target as any).select(), 1);
			} else if (e.shiftKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
				const newValue =
					e.key === 'ArrowUp' ? valueToCommit() * 2 : valueToCommit() / 2;
				setTempValue(`${newValue}`);
				commitValueCallback(newValue);
				setTimeout(() => (e.target as any).select(), 1);
			}
		},
		[commitValueCallback, valueToCommit, setTempValue, value],
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
