import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './routes/home';
import { FourOhFour } from './routes/four-oh-four';
import { PatchEditor } from './routes/patch-editor';

export const Kitchen: React.FunctionComponent = () => {

	const [midiIsEnabled, setMidiIsEnabled] = React.useState(false);

	useEffect(() => {
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index={false} element={<Home />} />
				<Route path="/patch" element={<PatchEditor />} />
				<Route path="/patch/:id" element={<PatchEditor />} />
				<Route path="*" element={<FourOhFour />} />
			</Routes>
		</BrowserRouter>
	);
};
