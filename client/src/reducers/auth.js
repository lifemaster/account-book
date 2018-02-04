import { LOGIN_AUTH, LOGOUT_AUTH, PENDING_AUTH } from '../actions';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case LOGIN_AUTH:
      return {
        authState: action.authState,
        userObj: action.userObj
      };
    case PENDING_AUTH:
      return {
        authState: action.authState
      };
    case LOGOUT_AUTH:
      return {
        authState: action.authState
      };
    default:
      return state;
  }
}
