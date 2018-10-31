import { combineReducers } from 'redux';
import {elementsReducer, elementReducer} from './elementReducer';
import {authReducer} from './authReducer'


export default combineReducers({
    elements: elementsReducer,
    element: elementReducer,
    auth: authReducer,
});