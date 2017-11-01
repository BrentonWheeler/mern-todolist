import todoList from "../../api/todoList";
import { DELETE_TODO_ITEM } from "./types";

export default function deleteTodoItemAction (todoListID, todoItemID) {
    return dispatch => {
        return todoList.deleteItem(todoListID, todoItemID).then(() => {
            dispatch(deleteTodoItemActionAsync(todoItemID));
            return;
        });
    };
}

function deleteTodoItemActionAsync (todoItemID) {
    return {
        type: DELETE_TODO_ITEM,
        shortID: todoItemID
    };
}
