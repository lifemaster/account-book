import { APP_DRAWER_TOGGLE } from '../actions';

export default function reducer(state = { opened: false }, action) {
  switch(action.type) {
    case APP_DRAWER_TOGGLE:
      return { opened: action.isOpened };
    default:
      return state;
  }
}
