import { combineReducers } from 'redux';
import loggedUser from '../reducers/loggedUser';
import questions from '../reducers/questions';
import users from '../reducers/users';

export default combineReducers({
  loggedUser,
  questions,
  users
});
