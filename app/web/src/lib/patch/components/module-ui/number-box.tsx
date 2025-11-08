import React, { useCallback, useContext, useEffect, useState } from 'react';
import { randomId } from 'synth.kitchen-shared';

import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { Key } from '../../constants/key';

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

const makeId = () => randomId();

export const NumberBox: React.FunctionComponent<{
	name: string;
	unit: string;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ name, unit, value, commitValueCallback }) => {
	const { dispatch } = useContext(PatchContext);

	const [id] = useState(makeId);
	const [tempValue, setTempValue] = useState<string | undefined>(undefined);

	useEffect(() => {
		setTempValue(undefined);
	}, [value]);

	const valueToCommit = useCallback(() => {
		return tempValue ? parseFloat(tempValue) : value;
	}, [tempValue, value]);

	const onFocus = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			dispatch(patchActions.focusInputAction(id));
			setTempValue(`${value}`);
			setTimeout(() => {
				e.target.select();
			}, 10);
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
		setTempValue(undefined);
		dispatch(patchActions.blurInputAction());
	}, [commitValueCallback, dispatch, setTempValue, valueToCommit]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			const el = e.target as HTMLInputElement;
			const key = e.key.toLowerCase();
			if (key === Key.ENTER) {
				commitValueCallback(valueToCommit());
				el.select();
			} else if (key === Key.ESCAPE) {
				setTempValue(`${value}`);
				el.setAttribute('disabled', 'true');
				setTimeout(() => {
					el.removeAttribute('disabled');
					el.select();
				}, 0);
			} else if (key === Key.ARROW_DOWN || key === Key.ARROW_UP) {
				if (e.shiftKey) {
					const newValue =
						key === Key.ARROW_UP ? valueToCommit() * 2 : valueToCommit() / 2;
					setTempValue(`${newValue}`);
					commitValueCallback(newValue);
					setTimeout(() => el.select(), 1);
				} else {
					const numberOfDecimals = countDecimals(valueToCommit());
					const smallestIncrement = 0.1 ** numberOfDecimals;
					let newValue =
						key === Key.ARROW_UP
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
					setTimeout(() => el.select(), 1);
				}
			} else if (key === Key.ARROW_LEFT || key === Key.ARROW_RIGHT) {
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
								key === Key.ARROW_LEFT ? end - 1 : end + 1,
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
								key === Key.ARROW_LEFT ? start - 1 : start + 1,
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
							key === Key.ARROW_LEFT
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
								key === Key.ARROW_LEFT ? start - 1 : start + 1,
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
		<div>
			<label htmlFor={id}>
				<h3>{name.replace('_', ' ')}</h3>
			</label>
			<input
				id={id}
				type="text"
				value={tempValue ?? `${value}${unit}`}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
};
