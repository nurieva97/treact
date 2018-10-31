import { ADD_ELEMENT, DELETE_ELEMENT, FETCH_ELEMENT, EDIT_ELEMENT, EDIT_ELEMENT_CHANGE, GET_ELEMENT } from '../actions/types';
import {store} from '../index'

export function elementsReducer (state = [], action) {
    switch(action.type) {
        case FETCH_ELEMENT:
            return action.elements;
        case DELETE_ELEMENT:
            return state.filter(element => element.id !== action.payload.id);
        case ADD_ELEMENT:
            return [...state, action.payload.element];
        case EDIT_ELEMENT:
            return state.map((element) => element.id === action.payload.id ? {...action.payload.element}:element);
        default:
            return state;
    }
};

export function elementReducer (state = [], action) {
    console.log("STATE RED", store)
    switch(action.type) {
        case GET_ELEMENT:
            return action.element;
        default:
            return state;
    }
};

