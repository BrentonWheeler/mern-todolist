import { GET_TRELLO_LISTS, SAVE_TRELLO_LIST_INFO } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TRELLO_LISTS:
            return Object.assign({}, state, {
                token: action.token,
                secret: action.secret,
                boards: action.boards
            });
            break;
        case SAVE_TRELLO_LIST_INFO:
            return Object.assign({}, state, {
                importListID: action.listID,
                importListName: action.listName,
                importBoardID: action.boardID,
                importBoardName: action.boardName
            });
            break;
        default:
            return state;
    }
}
