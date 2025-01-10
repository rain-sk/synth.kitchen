import React from 'react';

const defaultRef = {
	current: document.createElement('div'),
};

export const UseScrollContext =
	React.createContext<React.RefObject<HTMLElement>>(defaultRef);
