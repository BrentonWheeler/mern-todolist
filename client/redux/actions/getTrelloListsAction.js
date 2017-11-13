import trelloAPI from "../../api/trello";
import { GET_TRELLO_LISTS } from "./types";

export default function getTrelloListsAction (token, secret) {
    return dispatch => {
        return trelloAPI.getBoards(token, secret).then(res => {
            let boards = res.data;
            dispatch(getTrelloListsActionAsync(token, secret, boards));
            return boards;
        });
    };
}

function getTrelloListsActionAsync (token, secret, boards) {
    return {
        type: GET_TRELLO_LISTS,
        token: token,
        secret: secret,
        boards: boards
    };
}
