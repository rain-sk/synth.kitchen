import { useFlux } from 'use-flux';

import { Reducers } from './reducers';
import { initialState } from './state';

export const [KitchenContext, KitchenProvider] = useFlux(initialState, Reducers);
