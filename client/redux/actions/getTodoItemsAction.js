import todoListAPI from "../../api/todoList";
import { SERVER_GET_TODO_ITEMS } from "./types";

export default function getTodoItemsAction (todoListID) {
    return dispatch => {
        return todoListAPI.getItems(todoListID).then(itemsJSON => {
            let itemArray = itemsJSON.data.itemArray;
            let title = itemsJSON.data.title;
            dispatch(getTodoItemsActionToServerAsync(itemArray, todoListID, title));
            return itemArray;
        });
    };
}

function getTodoItemsActionToServerAsync (itemArray, todoListID, title) {
    return {
        type: SERVER_GET_TODO_ITEMS,
        itemArray: itemArray,
        todoListID: todoListID,
        title: title
    };
}
