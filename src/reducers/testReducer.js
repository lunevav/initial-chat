const initialState = {
    data: "dyadya misha"
}

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_NAME":
            return {
                ...state,
                data: action.payload

            }
        default: {
            return state;
        }

    }
}