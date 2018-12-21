import { useFlux } from 'use-flux';

import { IoReducers } from './actions';
import { initialState } from './state';

export const [IoContext, IoProvider] = useFlux(initialState, IoReducers);