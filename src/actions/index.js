import axios from 'axios';
import {ADD_ELEMENT, DELETE_ELEMENT, FETCH_ELEMENT, EDIT_ELEMENT, GET_ELEMENT, EDIT_ELEMENT_CHANGE} from "./types";


const apiUrl = 'https://stormy-tor-53869.herokuapp.com/api';


export const addElement = (element) => {
    const token = localStorage.getItem("token");

    return (dispatch) => {
        return axios.post(`${apiUrl}/points?access_token=${token}`, element)
            .then(response => {
                const element = {
                    id: response.data.id,
                    title: response.data.title,
                    lng: response.data.lng,
                    lat: response.data.lat,
                };
                dispatch({
                    type: ADD_ELEMENT,
                    payload: {
                        element
                    }
                })
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const deleteElement = id => {
    const token = localStorage.getItem("token");

    return (dispatch) => {
        return axios.delete(`${apiUrl}/points/${id}?access_token=${token}`)
            .then(response => {
                dispatch({
                    type: DELETE_ELEMENT,
                    payload: {
                        id: id
                    }
                })
            })
            .catch(error => {
                throw(error);
            });
    };
};


export const fetchAllElements = () => {
    const token = localStorage.getItem("token");

    return (dispatch) => {
        return axios.get(`${apiUrl}/points?access_token=${token}`)
            .then(response => {
                dispatch({
                    type: FETCH_ELEMENT,
                    elements: response.data
                })

            })
            .catch(error => {
                throw(error);
            });
    };
};


export const getElement = id =>  {
    return (dispatch) => {
        return axios.get(`${apiUrl}/points/${id}`)
            .then(response => {
                dispatch({
                    type: GET_ELEMENT,
                    element: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    };
};


export const editElement = (id, element) => {
    const token = localStorage.getItem("token");

    return (dispatch) => {
        return axios.patch(`${apiUrl}/points/${id}?access_token=${token}`, element)
            .then(response => {
                dispatch({
                    type: EDIT_ELEMENT,
                    payload: {
                        id: id,
                        element: response.data
                    }
                });
            })
            .catch(error => {
                throw(error);
            });
    };
};


