import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    video: videoReducer,
    error: errorReducer,
    auth: authReducer
})