import todoList from "../../api/todoList";
import { GET_TODO_ITEMS } from "./types";

export default function getTodoItemsAction (todoListID) {
    return dispatch => {
        return todoList.getItems(todoListID).then(itemsJSON => {
            let itemArray = itemsJSON.data.itemArray;
            dispatch(getTodoItemsActionAsync(itemArray, todoListID));
            return itemArray;
        });
    };
}

function getTodoItemsActionAsync (itemArray, todoListID) {
    return {
        type: GET_TODO_ITEMS,
        itemArray: itemArray,
        todoListID: todoListID
    };
}
