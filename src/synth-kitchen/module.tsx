import React from 'react'

import { useModule } from './modules/useModule';

export const Module: React.FunctionComponent<{ moduleKey: string }> = ({ moduleKey }) => {
    const module = useModule(moduleKey);
    return <><h1>{JSON.stringify(module)}</h1><h2>{moduleKey}</h2></>
};