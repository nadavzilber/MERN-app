import { combineReducers } from 'redux';
import AppReducer from './AppReducer'
import LoginReducer from './LoginReducer'
import RegistrationReducer from './RegistrationReducer'
//import {AppReducer, LoginReducer, RegistrationReducer} from './store/reducers/'

export default combineReducers({
    app: AppReducer,
    login: LoginReducer,
    register: RegistrationReducer,
});