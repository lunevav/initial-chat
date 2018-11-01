import {
    GET_MESSAGES_FAILED,
    GET_MESSAGES_PENDING,
    GET_MESSAGES_SUCCESS
} from '../ACTION_TYPES/ACTION_TYPES'

const initialState = {
    messages: [],
    error: null,
    status: {status: ''}
};

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES_PENDING:
            return {
                ...state,
                status: {status: 'pending'}
            }
        case GET_MESSAGES_SUCCESS: {
            const messages = action.payload ? Object.values(action.payload) : []
            const PARSED_MESSAGE = [];
            for (let i = 0; i < messages.length; i++) {
                PARSED_MESSAGE.push({
                    id: Object.keys(action.payload)[i],
                    message: messages[i].message,
                    name: messages[i].name
                })
            }
            return {
                ...state,
                messages: PARSED_MESSAGE,
                status: {status: 'success'}
            }
        }
        case GET_MESSAGES_FAILED: {
            return {
                ...state,
                error: action.payload,
                status: {status: 'failed'}
            }
        }
        default: {
            return state;
        }

    }
}