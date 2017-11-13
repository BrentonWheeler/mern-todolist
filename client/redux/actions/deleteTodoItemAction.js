import todoListAPI from "../../api/todoList";
import { SERVER_DELETE_TODO_ITEM } from "./types";

export default function deleteTodoItemAction (todoListID, todoItemID) {
    return dispatch => {
        return todoListAPI.deleteItem(todoListID, todoItemID).then(() => {
            dispatch(deleteTodoItemActionToServerAsync(todoItemID));
            return;
        });
    };
}

function deleteTodoItemActionToServerAsync (todoItemID) {
    return {
        type: SERVER_DELETE_TODO_ITEM,
        id: todoItemID
    };
}
