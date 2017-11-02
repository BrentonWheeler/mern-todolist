import todoListAPI from "../../api/todoList";
import { UPDATE_TODO_ITEM_TEXT } from "./types";

export default function updateTodoItemTextAction (todoListID, todoItemID, newText) {
    return dispatch => {
        return todoListAPI
            .updateItemText({ todoListID: todoListID, todoItemID: todoItemID, newText: newText })
            .then(res => {
                console.log("got HERE! 1");
                dispatch(updateTodoItemTextActionAsync(todoItemID, newText));
            });
    };
}

function updateTodoItemTextActionAsync (todoItemID, newText) {
    console.log("got HERE! 2");
    return {
        type: UPDATE_TODO_ITEM_TEXT,
        todoItemID: todoItemID,
        newText: newText
    };
}
