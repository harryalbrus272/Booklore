import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';
let store;
export function confisureStore() {
    store = createStore(reducer, applyMiddleware(thunk, logger));
    return store;
}