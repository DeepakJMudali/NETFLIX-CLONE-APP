import { combineReducers } from 'redux';
import authUserReducer from './authReducer';
import contentReducer from './contentReducer';

const rootReducer = combineReducers({
  authUser: authUserReducer,
  content: contentReducer,
});

export default rootReducer;
