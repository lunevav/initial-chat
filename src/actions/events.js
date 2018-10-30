import {
    GET_MESSAGES_FAILED,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_PENDING
} from '../ACTION_TYPES/ACTION_TYPES'


export const fetchMessages = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const messages = firebase.database().ref('messages/').limitToLast(15)

    dispatch({ type: GET_MESSAGES_PENDING });

    messages.on('value', function (snapshot) {
        // notifyMe('New Message!');
        console.log(snapshot.val());
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: snapshot.val() });
    });
};

export default {
    fetchMessages
}
