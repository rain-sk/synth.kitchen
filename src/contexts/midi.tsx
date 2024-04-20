import React, { useCallback, useState } from 'react';
import { Input, Output, PortEvent, WebMidi } from 'webmidi';
import { useEffectOnce } from '../hooks/use-effect-once';

interface IMidiContext {
	inputs: Input[];
	outputs: Output[];
}

export const MidiContext = React.createContext<IMidiContext>({
	inputs: [],
	outputs: []
});

export const MidiContextProvider: React.FC<React.PropsWithChildren> = ({
	children
}) => {
	const [inputs, setInputs] = useState<Input[]>(() => WebMidi.inputs);

	const [outputs, setOutputs] = useState<Output[]>(() => WebMidi.outputs);

	const onPort = useCallback((e: PortEvent) => {
		if (e.port.type === 'input') {
			setInputs(WebMidi.inputs);
		} else if (e.port.type === 'output') {
			setOutputs(WebMidi.outputs);
		}
	}, []);

	useEffectOnce(() => {
		WebMidi.addListener('connected', onPort);
		WebMidi.addListener('disconnected', onPort);
		WebMidi.addListener('portschanged', onPort);
		return () => {
			WebMidi.removeListener('connected');
			WebMidi.removeListener('disconnected');
			WebMidi.removeListener('portschanged');
		};
	});

	return (
		<MidiContext.Provider value={{ inputs, outputs }}>
			{children}
		</MidiContext.Provider>
	);
};
