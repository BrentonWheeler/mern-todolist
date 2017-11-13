import todoListAPI from "../../api/todoList";
import { SERVER_DELETE_TODO_ITEM } from "./types";

export default function deleteTodoItemAction (todoListID, todoItemID) {
    return dispatch => {
        return todoListAPI.deleteItem(todoListID, todoItemID).then(() => {
            dispatch(deleteTodoItemActionAsyncSERVER(todoItemID));
            //dispatch(deleteTodoItemActionAsync(todoItemID));
            return;
        });
    };
}

function deleteTodoItemActionAsyncSERVER (todoItemID) {
    return {
        type: SERVER_DELETE_TODO_ITEM,
        id: todoItemID
    };
}

// function deleteTodoItemActionAsync (todoItemID) {
//     return {
//         type: DELETE_TODO_ITEM,
//         id: todoItemID
//     };
// }
