import { SAVE_TRELLO_LIST_INFO } from "./types";

export default function getTrelloListsAction (listID, listName, boardID, boardName) {
    return dispatch => {
        dispatch(getTrelloListsActionAsync(listID, listName, boardID, boardName));
    };
}

function getTrelloListsActionAsync (listID, listName, boardID, boardName) {
    return {
        type: SAVE_TRELLO_LIST_INFO,
        listID: listID,
        listName: listName,
        boardID: boardID,
        boardName: boardName
    };
}
