import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers';

export default createStore(reducer, {auth: { authState: 'unauthorized' }}, applyMiddleware(promise, thunk, logger));
