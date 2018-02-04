import { CHANGE_CURRENT_PAGE } from '../actions';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case CHANGE_CURRENT_PAGE:
      return {
        title: action.title
      };
    default:
      return state;
  }
}
