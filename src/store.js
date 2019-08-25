import store from './store/index';
import { addUsername } from './actions/index';
import { addClicks } from './actions/index';
window.store = store;
window.addUsername = addUsername;
window.addClicks = addClicks;
