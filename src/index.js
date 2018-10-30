import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter, Route } from 'react-router-dom';

// REDUX STORE
import configureStore  from './store/store';
const store = configureStore();

// const history = syncHistoryWithStore(browserHistory, store)

window.mystore = store;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App}></Route>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));

serviceWorker.unregister();
