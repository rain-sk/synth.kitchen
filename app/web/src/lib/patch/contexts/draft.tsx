import React, { createContext, useContext } from 'react';

type DraftContextValue = {
	dirty: boolean;
	ready: boolean;
	reset: () => void;
	markSaved: () => void;
};

const defaultValue: DraftContextValue = {
	dirty: false,
	ready: false,
	reset: () => {},
	markSaved: () => {},
};

export const DraftContext = createContext<DraftContextValue>(defaultValue);

export const useDraftContext = () => useContext(DraftContext);

export const DraftContextProvider: React.FC<{
	value: DraftContextValue;
	children: React.ReactNode;
}> = ({ value, children }) => (
	<DraftContext.Provider value={value}>{children}</DraftContext.Provider>
);
