import React, { useCallback, useContext, useState } from 'react';

import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { randomId } from '../../../utils/random-id';

// https://stackoverflow.com/a/27082406
const countDecimals = (value: number) => {
	let text = value.toString();
	// verify if number 0.000005 is represented as "5e-6"
	if (text.indexOf('e-') > -1) {
		let [, trail] = text.split('e-');
		let deg = parseInt(trail, 10);
		return deg;
	}
	// count decimals for number in representation like "0.123456"
	if (Math.floor(value) !== value) {
		return text.split('.')[1].length || 0;
	}
	return 0;
};

export const NumberBox: React.FunctionComponent<{
	name: string;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ name, value, commitValueCallback }) => {
	const { dispatch } = useContext(PatchContext);

	const [id] = useState(() => randomId());
	const [tempValue, setTempValue] = useState<string | void>();

	const valueToCommit = useCallback(() => {
		return tempValue ? parseFloat(tempValue) : value;
	}, [tempValue, value]);

	const onFocus = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			dispatch(patchActions.focusInputAction(id));
			setTempValue(`${value}`);
			e.target.select();
		},
		[id, setTempValue, value],
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

			const positiveDecimal = string[0] === '.' || string[0] === ',';

			if (string.length === 1 && (negative || positiveDecimal)) {
				setTempValue(negative ? '-' : '.');
				return;
			}

			const negativeDecimal =
				string[0] === '-' && (string[1] === '.' || string[1] === ',');

			if (string.length === 2 && negativeDecimal) {
				setTempValue('-.');
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
		dispatch(patchActions.blurInputAction());
	}, [commitValueCallback, dispatch, setTempValue, valueToCommit]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				commitValueCallback(valueToCommit());
				(e.target as any).select();
			} else if (e.key === 'Escape') {
				setTempValue(`${value}`);
				setTimeout(() => (e.target as any).select(), 1);
			} else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				if (e.shiftKey) {
					const newValue =
						e.key === 'ArrowUp' ? valueToCommit() * 2 : valueToCommit() / 2;
					setTempValue(`${newValue}`);
					commitValueCallback(newValue);
					setTimeout(() => (e.target as any).select(), 1);
				} else {
					const numberOfDecimals = countDecimals(valueToCommit());
					const smallestIncrement = 0.1 ** numberOfDecimals;
					let newValue =
						e.key === 'ArrowUp'
							? valueToCommit() + smallestIncrement
							: valueToCommit() - smallestIncrement;

					newValue = parseFloat(
						(
							Math.round(newValue * 10 ** numberOfDecimals) *
							0.1 ** numberOfDecimals
						).toFixed(numberOfDecimals),
					);

					setTempValue(`${newValue}`);
					commitValueCallback(newValue);
					setTimeout(() => (e.target as any).select(), 1);
				}
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				const input = e.target as HTMLInputElement;
				const forward =
					input.selectionDirection === 'forward' ||
					input.selectionDirection === 'none';
				const start =
					(forward ? input.selectionStart : input.selectionEnd) ?? 0;
				const end = (forward ? input.selectionEnd : input.selectionStart) ?? 0;

				if (e.shiftKey) {
					if (start !== end) {
						const newEnd = Math.max(
							0,
							Math.min(
								tempValue?.length ?? 0,
								e.key === 'ArrowLeft' ? end - 1 : end + 1,
							),
						);

						input.setSelectionRange(
							start < newEnd ? start : newEnd,
							start < newEnd ? newEnd : start,
							start < newEnd
								? 'forward'
								: start === newEnd
								? 'none'
								: 'backward',
						);
					} else {
						const newEnd = Math.max(
							0,
							Math.min(
								tempValue?.length ?? 0,
								e.key === 'ArrowLeft' ? start - 1 : start + 1,
							),
						);
						input.setSelectionRange(
							start < newEnd ? start : newEnd,
							start < newEnd ? newEnd : start,
							start < newEnd
								? 'forward'
								: start === newEnd
								? 'none'
								: 'backward',
						);
					}
				} else {
					if (start !== end) {
						const newCursorPosition =
							e.key === 'ArrowLeft'
								? forward
									? start
									: end
								: forward
								? end
								: start;
						input.setSelectionRange(newCursorPosition, newCursorPosition);
					} else {
						const newCursorPosition = Math.max(
							0,
							Math.min(
								tempValue?.length ?? 0,
								e.key === 'ArrowLeft' ? start - 1 : start + 1,
							),
						);
						input.setSelectionRange(newCursorPosition, newCursorPosition);
					}
				}
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
