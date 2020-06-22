import {combineReducers} from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducer';


const rootReducer = combineReducers({
    authReducer,
    taskReducer
})

export default rootReducer;