import { Input, Output } from 'synth.kitchen-shared';

export type IConnect = {
	type: 'Connect';
	payload: [Output, Input];
};

export const connectAction = (output: Output, input: Input): IConnect => ({
	type: 'Connect',
	payload: [output, input],
});

export type IDisconnect = {
	type: 'Disconnect';
	payload: { connectionKey: string };
};

export const disconnectAction = (connectionKey: string): IDisconnect => ({
	type: 'Disconnect',
	payload: { connectionKey },
});
