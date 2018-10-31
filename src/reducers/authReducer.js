import {AUTH_LOGIN, IS_LOGINED} from '../actions/types';

export function authReducer (state = [], action) {
    switch(action.type) {
        case AUTH_LOGIN:
            return action.payload;
        case IS_LOGINED:
            return action.payload;
        default:
            return state;
    }
};