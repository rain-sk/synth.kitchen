import { useFlux } from 'flux-fluent';

import { IoReducers } from './actions';
import { initialState } from './state';

export const [IoContext, IoProvider] = useFlux(initialState, IoReducers);