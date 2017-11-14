import todoListAPI from "../../api/todoList";
import { SERVER_TOGGLE_TODO_ITEM } from "./types";

export default function toggleCompleteAction (todoListID, todoItemID, currentState) {
    return dispatch => {
        return todoListAPI.toggleItem(todoListID, todoItemID, currentState).then(res => {
            dispatch(toggleCompleteActionToServerAsync(todoListID, todoItemID, currentState));
            return;
        });
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
