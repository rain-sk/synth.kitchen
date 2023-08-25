import React, { useContext } from 'react';
import { ConnectionContext } from '../contexts/connection';

export const Connections: React.FC = () => {
	const { connectionCount, connections } = useContext(ConnectionContext);
	console.log({ connectionCount, connections });
	return <div id="connections"></div>;
};
