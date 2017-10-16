import { CREATE_TODO } from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case CREATE_TODO:
            return Object.assign({}, state, {
                id: action.payload
            });
            break;
    }
    return {
        state
    };
}
