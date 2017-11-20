import todoListAPI from "../../api/todoList";
import { TOGGLE_TODO_ITEM, SERVER_TOGGLE_TODO_ITEM } from "./types";

export default function toggleCompleteAction (todoListID, todoItemID, currentState) {
    return dispatch => {
        return todoListAPI.toggleItem(todoListID, todoItemID, currentState).then(res => {
            dispatch(toggleCompleteActionAsync(todoItemID, currentState));
            dispatch(toggleCompleteActionToServerAsync(todoListID, todoItemID, currentState));
            return;
        });
    };
}

function toggleCompleteActionAsync (todoItemID, currentState) {
    return {
        type: TOGGLE_TODO_ITEM,
        todoItemID: todoItemID,
        currentState: currentState
    };
}

function toggleCompleteActionToServerAsync (todoListID, todoItemID, currentState) {
    return {
        type: SERVER_TOGGLE_TODO_ITEM,
        todoListID: todoListID,
        todoItemID: todoItemID,
        currentState: currentState
    };
}
