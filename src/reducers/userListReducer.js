import {
    ADD_USER_AND_UPDATE_USER,
    GET_USER_LIST
} from '../ACTION_TYPES';
import {ADD_USER} from "../ACTION_TYPES/ACTION_TYPES";

const initialState = {
    userData: {
        id: null,
        name: null,
        status: false
    },
    userList: []
};

export default function userListReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER_AND_UPDATE_USER:
            return {
                ...state,
                userData: action.payload
            }
        case GET_USER_LIST: {
            return {
                ...state,
                userList: Object.values(action.payload || [])
            }
        }
        default: {
            return state;
        }

    }
}