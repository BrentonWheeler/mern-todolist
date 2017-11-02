import todoListAPI from "../../api/todoList";
import { UPDATE_TODO_ITEM_TEXT } from "./types";

export default function updateTodoItemTextAction (todoListID, todoItemID, newText) {
    return dispatch => {
        return todoListAPI.updateItemText(todoListID, todoItemID, newText).then(res => {
            dispatch(updateTodoItemTextActionAsync(todoItemID, newText));
        });
    };
}

function updateTodoItemTextActionAsync (todoItemID, newText) {
    return {
        type: UPDATE_TODO_ITEM_TEXT,
        todoItemID: todoItemID,
        newText: newText
    };
}
