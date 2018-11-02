// @TODO MAKE KPaCuBO!
import {
    GET_MESSAGES_FAILED,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_PENDING
} from '../ACTION_TYPES/ACTION_TYPES'

import {
    GET_USER_LIST
} from '../ACTION_TYPES';

export const fetchMessages = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const messages = firebase.database().ref('messages/').limitToLast(100)

    dispatch({ type: GET_MESSAGES_PENDING });

    messages.on('value', function (snapshot) {
        // notifyMe('New Message!');
        console.log(snapshot.val());
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: snapshot.val() });
    });
};

export const getUserList = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const messages = firebase.database().ref('users/')

    messages.on('value',  (snapshot) => {

        try {
            Object.values(snapshot.val())
        } catch (e) {
            window.location.reload();
        }

        dispatch({ type: GET_USER_LIST, payload: snapshot.val() });
    });
};

export default {
    fetchMessages,
    getUserList
}
