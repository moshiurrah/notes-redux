import { combineReducers } from 'redux';
import authReducer from './auth';
import notesReducer from './modNote';

export const noteRootReducer = combineReducers({
  authReducer,
  notesReducer
});

export default noteRootReducer;