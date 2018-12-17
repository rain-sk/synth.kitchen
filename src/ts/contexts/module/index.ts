import { useFlux } from 'flux-fluent';

import { ModuleReducers } from './actions';
import { initialState } from './state';

export const [ModuleContext, ModuleProvider] = useFlux(initialState, ModuleReducers);