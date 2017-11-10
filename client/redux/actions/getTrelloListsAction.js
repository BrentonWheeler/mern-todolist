import trelloAPI from "../../api/trello";
import { GET_TRELLO_LISTS } from "./types";

export default function getTrelloListsAction (token, secret) {
    return dispatch => {
        return trelloAPI.getBoards(token, secret).then(res => {
            let boards = res.data;
            dispatch(getTrelloListsActionAsync(boards));
            return boards;
        });
    };
}

function getTrelloListsActionAsync (boards) {
    return {
        type: GET_TRELLO_LISTS,
        boards: boards
    };
}
