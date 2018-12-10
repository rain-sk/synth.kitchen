import * as React from 'react';
import { IoContext } from '../contexts/io';

export const IoButton: React.FunctionComponent = (props) => {
	const context = React.useContext(IoContext);
	return <button type="button" onClick={() => context.dispatch({ type: 'IO_CLICK', payload: 'ok' })}>ok</button>
}