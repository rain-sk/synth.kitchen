import * as Fluent from 'flux-fluent';

import { IoReducers } from './actions';
import { initialState } from './state';

export const [IoContext, IoProvider] = Fluent.Factory(initialState, IoReducers);