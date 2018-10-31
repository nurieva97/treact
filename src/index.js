import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import rootReducer from './reducers';



export const store = createStore(rootReducer, applyMiddleware(thunk));



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

