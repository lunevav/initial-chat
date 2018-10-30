import {
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_FAILED,
    SEND_MESSAGE_SUCCESS
} from '../ACTION_TYPES/ACTION_TYPES';

export const sendMessage = (message) =>
    (dispatch, getState, getFirebase) => {
        dispatch({ type: SEND_MESSAGE_PENDING });
        if (!localStorage.getItem('userData')) {
            return;
        }

        const m = {
            name: localStorage.getItem('userData'),
            message: message
        };

        const firebase = getFirebase()
        firebase.database().ref(`messages/`)
            .push(m)
            .then(() => {
                dispatch({ type: SEND_MESSAGE_SUCCESS })
            })
            .catch((err) => {
                dispatch({ type: SEND_MESSAGE_FAILED, payload: err })
            })
    };

export default {
    sendMessage
}