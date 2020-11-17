import { createStore, applyMiddleware, compose } from 'redux'

import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware()))

export default store;