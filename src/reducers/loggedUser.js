import { SET_LOGGED_USER } from '../actions/loggedUser';

export default function loggedUser(state = null, action) {
  if (action.type === SET_LOGGED_USER) {
    return action.id;
  }
  return state;
}
