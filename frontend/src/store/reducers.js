import { combineReducers } from 'redux';
import window from './window/slice';
import language from './language/slice';
import modal from './modal/slice';
import loading from './loading/slice';
import table from './table/slice';
import route from './route/slice';
import menu from './menu/slice';
import counter from './counter/slice';
import braiding from './braiding/slice';
import notification from './notification/slice';

export default combineReducers({
  window,
  language,
  modal,
  loading,
  table,
  route,
  menu,
  counter,
  braiding,
  notification,
});
