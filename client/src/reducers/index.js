import { combineReducers } from 'redux';
import authReducer from './auth';
import notesReducer from './modNote';
import colorReducer from './changeColor';

export const noteRootReducer = combineReducers({
  authReducer,
  notesReducer,
  colorReducer
});

export default noteRootReducer;