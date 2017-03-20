import { combineReducers } from 'redux';

import smile from './smile';
import colors from './colors';

const reducers = combineReducers({
  smile,
  colors
});

export default reducers;
