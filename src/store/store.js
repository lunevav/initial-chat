import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


// @LISTENERS GLOBAL
import { fetchMessages, getUserList } from '../actions/events';
import { addUserAndUpdate } from '../actions/senders';

import logger from 'redux-logger'
// const db = require('firebase/database');

const config = {
    apiKey: "AIzaSyA-5MJ3bhaUTdZTXH8UGXp6Md7xJ_WQzgs",
    authDomain: "reactchat-dbe94.firebaseapp.com",
    databaseURL: "https://reactchat-dbe94.firebaseio.com",
    projectId: "reactchat-dbe94",
    storageBucket: "reactchat-dbe94.appspot.com",
    messagingSenderId: "325982962002"
};

const rrfConfig = {
    userProfile: 'users'
};

firebase.initializeApp(config);

const USER_FOR_DEVELOPMENT = 'development';

let name;
while(!name) {
    name = prompt();
}
alert("Hello: " + name);
localStorage.setItem('userData', name);

// REMOTE MIDDLWARES
export default function configStore(initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(logger, thunk.withExtraArgument(getFirebase)),
            window.devToolsExtension ? window.devToolsExtension() : f => f,
            reactReduxFirebase(firebase, rrfConfig)
        )
    );


    // @LISTENERS
    store.dispatch(fetchMessages());
    store.dispatch(getUserList());

    store.dispatch(addUserAndUpdate(true));
    return  store;
}