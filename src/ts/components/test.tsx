import * as React from 'react';
import { IoContext } from '../contexts/io';

export const Test: React.FunctionComponent = () => {
	const context = React.useContext(IoContext);
	return (
		<p>{context.state.active || 'inactive'}</p>
	);
}
