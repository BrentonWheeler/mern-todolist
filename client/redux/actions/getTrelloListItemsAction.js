import trelloAPI from "../../api/trello";
import { GET_TRELLO_LIST_ITEMS } from "./types";

export default function getTrelloListItemsAction (trelloObject, todoListID) {
    return dispatch => {
        let title = trelloObject.importBoardName + ": " + trelloObject.importListName;
        return trelloAPI
            .getListItems(trelloObject.trelloAuthKey, todoListID, trelloObject.importListID, title)
            .then(res => {
                let itemArray = res.data;

                // let itemArray = [
                //     { text: "item one", completed: false, id: "1111111" },
                //     { text: "item two", completed: false, id: "222222" }
                // ];
                dispatch(getTrelloListItemsActionAsync(title, itemArray));
                //return list;
            });
    };
}

function getTrelloListItemsActionAsync (title, itemArray) {
    return {
        type: GET_TRELLO_LIST_ITEMS,
        title: title,
        itemArray: itemArray
    };
}
