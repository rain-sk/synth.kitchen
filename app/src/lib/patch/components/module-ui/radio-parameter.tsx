import React, { useCallback, useState } from 'react';

export const RadioParameter: React.FunctionComponent<{
	moduleKey: string;
	name: string;
	options: string[];
	value: string;
	commitValueCallback: (newValue: string) => void;
}> = ({ moduleKey, name, options, value, commitValueCallback }) => {
	const [id] = useState(() => `${moduleKey}_${name}`);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			commitValueCallback(e.target.value);
		},
		[commitValueCallback]
	);

	const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLSelectElement>) => {
		e.stopPropagation();
	}, []);

	return (
		<section className="radioparam">
			<label htmlFor={id}>{name}</label>
			<select
				name={id}
				id={id}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</section>
	);
};
