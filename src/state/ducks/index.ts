import { combineReducers } from 'redux'

import { connectionReducer } from "./connections"

export const rootReducer = combineReducers({
    connections: connectionReducer
})
