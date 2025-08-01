import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const middleware = applyMiddleware();
// Develop: For redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(middleware));
