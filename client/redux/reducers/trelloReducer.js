import { GET_TRELLO_LISTS } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TRELLO_LISTS:
            return action.boards;
            break;
        default:
            return state;
    }
}
