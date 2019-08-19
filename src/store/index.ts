import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from "./ducks"


export default function configureStore() {

    return createStore(
        rootReducer,
        composeWithDevTools()
    );
}