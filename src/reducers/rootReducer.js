import { combineReducers } from 'redux';


//@REMOTE REDUCERS,
import { firebaseReducer } from 'react-redux-firebase'

// @REDUCERS
import TestReducer from './testReducer';
import sendMessageReducer from './sendMessageReducer';
import messageReducer from './messagesReducer';
import { routerReducer } from 'react-router-redux'

// @ROOT REDUCER
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    messageReducer,
    sendMessageReducer,
    TestReducer,
    router: routerReducer
});


export default rootReducer;