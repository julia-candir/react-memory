import { ADD_USERNAME } from '../constants/action-types';
import { ADD_CLICKS } from '../constants/action-types';
export function addUsername(payload) {
  return { type: ADD_USERNAME, payload };
}

export function addClicks(payload) {
  return { type: ADD_CLICKS, payload };
}
