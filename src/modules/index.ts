import { combineReducers } from 'redux';
import form from './form';
import ui from './ui';
import note from './note';

const rootReducer = combineReducers({
  form,
  ui,
  note
});

// useSelector사용을 위해 rootState를 보내줘야함
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
