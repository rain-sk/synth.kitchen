import * as React from 'react';
import { Io, IoProps } from './io';
import { guid } from '../utils/guid';
import { audioContext } from '../utils/audio-context';

const ioProps: IoProps = {
	name: 'output',
	guid: guid(),
	target: audioContext,
	accessor: 'destination'
}

export const GlobalOutput: React.FunctionComponent = () => {
	return (
		<ul className="global-out">
			<Io {...ioProps}>
				+
			</Io>
		</ul>
	)
}