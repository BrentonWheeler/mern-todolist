import trelloAPI from "../../api/trello";
import { GET_TRELLO_LISTS } from "./types";

export default function getTrelloListsAction (trelloAuthKey) {
    return dispatch => {
        return trelloAPI.getBoards(trelloAuthKey).then(res => {
            let boards = res.data;
            dispatch(getTrelloListsActionAsync(trelloAuthKey, boards));
            return boards;
        });
    };
}

function getTrelloListsActionAsync (trelloAuthKey, boards) {
    return {
        type: GET_TRELLO_LISTS,
        trelloAuthKey: trelloAuthKey,
        boards: boards
    };
}
