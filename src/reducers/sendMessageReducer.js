import {
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED
} from '../ACTION_TYPES/ACTION_TYPES';

const initialState = {
    status: { isLoading: '' },
    error: null
}

export default function sendMessageReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE_PENDING:
            return {
                ...state,
                status: { isLoading: "pending" },
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                status: { isLoading: "success" }

            }
        case SEND_MESSAGE_FAILED:
            return {
                ...state,
                status: { isLoading: "failed" },
                error: action.payload
            }
        default: {
            return state;
        }

    }
}