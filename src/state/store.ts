import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

function reducer(old: any, action: any) {
    return old
}

export default function configureStore(initialState = {}) {

    return createStore(
        reducer,
        initialState,
        composeWithDevTools()
    );
}