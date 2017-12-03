import { USER_LOGIN } from "../actions/types";

// TODO: Add cookie later
const initialState = {
    loggedIn: false,
    username: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                loggedIn: true,
                username: action.payload
            };
            break;
        default:
            return state;
    }
};
