import { createStore, combineReducers } from 'redux';

import dataReducer from './reducers/userReducer.js';

export default createStore(combineReducers({dataReducer}));
