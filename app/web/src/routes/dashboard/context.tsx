import React from 'react';

export const DashboardContext = React.createContext<{
	refresh: () => void;
}>({
	refresh: () => {},
});
