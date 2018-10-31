import axios from 'axios';
import {AUTH_LOGIN, GET_ELEMENT, IS_LOGINED} from "./types";

const apiUrl = 'https://stormy-tor-53869.herokuapp.com/api';

// import sessionApi from '../api/SessionApi';
// import axios from "axios/index";
// import {GET_ELEMENT} from "./types";
//
// export function loginSuccess() {
//     return {type: types.LOG_IN_SUCCESS}
// }

// export function logInUser(credentials) {
//
// }
//
//
// export const getElement = id =>  {
//     return (dispatch) => {
//         return axios.get(`${apiUrl}/points/${id}`)
//             .then(response => {
//                 console.log(response.data)
//                 dispatch({
//                     type: GET_ELEMENT,
//                     element: response.data
//                 })
//             })
//             .catch(error => {
//                 throw(error);
//             });
//     };
// };

export const fetchLogin = form => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/Users/login`, form)
            .then(response => {
                dispatch({
                    type: AUTH_LOGIN,
                    payload: response.data,
                })
            })
            .catch(error => {
                throw(error);
            });
    };
};


export const setLogin = (is_logined) => {
    return (dispatch) => {
        return dispatch({
            type: IS_LOGINED,
            payload: {
                is_authenticated: is_logined
            },
        })
    };
};


export function fetchRegistration(state) {
    axios.post(`${apiUrl}/Users`, state.form)
        .then((response) => {
            return response.data.email
        })
        .catch((error) => {
            return error
        })

}