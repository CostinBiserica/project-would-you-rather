export const SET_LOGGED_USER = 'SET_LOGGED_USER';

export function setLoggedUser(id) {
  return {
    type: SET_LOGGED_USER,
    id
  };
}
