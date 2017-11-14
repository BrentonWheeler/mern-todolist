import todoListAPI from "../../api/todoList";
import { SERVER_UPDATE_TODO_ITEM_TEXT } from "./types";

export default function updateTodoItemTextAction (todoListID, todoItemID, newText) {
    return dispatch => {
        return todoListAPI.updateItemText(todoListID, todoItemID, newText).then(res => {
            dispatch(updateTodoItemTextActionToServerAsync(todoListID, todoItemID, newText));
        });
    };
}

function updateTodoItemTextActionToServerAsync (todoListID, todoItemID, newText) {
    return {
        type: SERVER_UPDATE_TODO_ITEM_TEXT,
        todoListID: todoListID,
        todoItemID: todoItemID,
        newText: newText
    };
}
