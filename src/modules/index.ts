import { combineReducers } from 'redux';
import login from './login';
import ui from './ui';

const rootReducer = combineReducers({
  login,
  ui,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
