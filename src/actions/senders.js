import {
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_FAILED,
    SEND_MESSAGE_SUCCESS
} from '../ACTION_TYPES/ACTION_TYPES';

import {
    ADD_USER_AND_UPDATE_USER,
} from '../ACTION_TYPES';

import uuidv1  from 'uuid/v1';

// @TODO make more KPACuBO
export const addUserAndUpdate = (status) =>
    (dispatch, getState, getFirebase) => {

        const firebase = getFirebase()
        firebase.database().ref('users/' + localStorage.getItem('userData')).set({
            id: uuidv1(),
            name: localStorage.getItem('userData'),
            status: status
        })
            .then(() => {
                dispatch({
                    type: ADD_USER_AND_UPDATE_USER,
                    payload: {
                        id: uuidv1(),
                        name: localStorage.getItem('userData'),
                        status: status
                    }
                });
            });
};




export const sendMessage = (message) =>
    (dispatch, getState, getFirebase) => {
        dispatch({ type: SEND_MESSAGE_PENDING });
        if (message.length === 0) {
            return;
        }
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
    sendMessage,
    addUserAndUpdate
}



//
// irebase.app().database().ref("shops").orderByChild("email")
//     .equalTo(user.email).once("value", snapshot => {
//
//     const userData = snapshot.val();
//
//     // Check if it is a SHOP.
//     if (userData) {
//         console.log("Shop logged in!");
//         this.setState({
//             isAdminLoggedIn: false,
//             isUserLoggedIn: false,
//             isShopLoggedIn: true,
//             isNoneLoggedIn: false
//         });
//
//         // Check if it is a USER.
//     } else {
//         console.log("User logged in");
//         this.setState({
//             isAdminLoggedIn: false,
//             isUserLoggedIn: true,
//             isShopLoggedIn: false,
//             isNoneLoggedIn: false
//         });
//     }
// });