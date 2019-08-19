import { combineReducers } from 'redux'

import { connectionReducer, IConnectionState } from "./patch"

export interface RootState {
    connections: IConnectionState
}

export const rootReducer = combineReducers({
    connections: connectionReducer
})
