import { ADD_USERNAME, ADD_CLICKS } from '../constants/action-types';

const initialState = {
  userName: '',
  clicks: 0,
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_USERNAME) {
    return {
      ...state,
      username: action.payload,
    };
  }
  if (action.type === ADD_CLICKS) {
    return {
      ...state,
      clicks: action.payload,
    };
  }
  return state;
}
export default rootReducer;
