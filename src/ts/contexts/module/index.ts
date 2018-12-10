import * as Fluent from 'flux-fluent';

import { ModuleReducers } from './actions';
import { initialState } from './state';

export const [IoContext, IoProvider] = Fluent.Factory(initialState, ModuleReducers);