import config from '../config';
import cookie from '../cookie';

export const LOGIN_AUTH = 'LOGIN_AUTH';
export const LOGOUT_AUTH = 'LOGOUT_AUTH';
export const PENDING_AUTH = 'PENDING_AUTH';

export function getAuthState() {
  return dispatch => {
    const token = cookie.get(config.authCookieName);

    dispatch(pendingAuthAction());

    if (token) {
      return fetch(`${config.serverURI}/api/user`, {
        method: 'GET',
        headers: { 'Authorization': `JWT ${cookie.get(config.authCookieName)}` }
      })
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => {
        if (data) {
          return dispatch(signedInAuthAction(data));
        }

        cookie.remove(config.authCookieName);
        return dispatch(signedOutAuthAction());
      })
      .catch(err => {
        console.error(err);
        cookie.remove(config.authCookieName);
        return dispatch(signedOutAuthAction());
      });
    }

    return dispatch(signedOutAuthAction());
  }
}

export function signIn(token, userObj) {
  if (token && userObj) {
    cookie.set(config.authCookieName, token);
    return signedInAuthAction(userObj);
  }

  return signedOutAuthAction();
}

export function signOut() {
  return fetch(`${config.serverURI}/api/sign-out`, {
    method: 'POST',
    headers: {
      'Authorization': `JWT ${cookie.get(config.authCookieName)}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.status === 200 ? null : response.json())
  .then(data => {
    cookie.remove(config.authCookieName);
    return signedOutAuthAction();
  })
  .catch(err => {
    console.error(err);
    cookie.remove(config.authCookieName);
    return signedOutAuthAction();
  });
}

function pendingAuthAction() {
  return {
    type: PENDING_AUTH,
    authState: 'pending'
  };
}

function signedInAuthAction(userObj) {
  return {
    type: LOGIN_AUTH,
    authState: 'authorized',
    userObj
  };
}

function signedOutAuthAction() {
  return {
    type: LOGOUT_AUTH,
    authState: 'unauthorized'
  };
}
