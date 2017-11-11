import trelloAPI from "../../api/trello";
import { GET_TRELLO_LIST_ITEMS } from "./types";

export default function getTodoItemsAction (trelloObject, todoListID) {
    return dispatch => {
        return trelloAPI
            .getListItems(trelloObject.token, trelloObject.secret, todoListID, trelloObject.importListID)
            .then(res => {
                let itemArray = res.data;
                let title = trelloObject.importBoardName + ": " + trelloObject.importListName;
                // let itemArray = [
                //     { text: "item one", completed: false, id: "1111111" },
                //     { text: "item two", completed: false, id: "222222" }
                // ];
                dispatch(getTodoItemsActionAsync(title, itemArray));
                //return list;
            });
    };
}

function getTodoItemsActionAsync (title, itemArray) {
    return {
        type: GET_TRELLO_LIST_ITEMS,
        title: title,
        itemArray: itemArray
    };
}
