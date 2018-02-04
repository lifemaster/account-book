import { combineReducers } from 'redux';

import { default as auth } from './auth';
import { default as currentPage } from './currentPage';
import { default as drawer } from './drawer';

const reducer = combineReducers({ auth, currentPage, drawer });

export default reducer;
