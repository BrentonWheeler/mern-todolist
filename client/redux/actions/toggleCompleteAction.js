import todoListAPI from "../../api/todoList";
import { SERVER_TOGGLE_TODO_ITEM } from "./types";

export default function toggleCompleteAction (todoListID, todoItemID, currentState) {
    return dispatch => {
        return todoListAPI.toggleItem(todoListID, todoItemID, currentState).then(res => {
            dispatch(toggleCompleteActionAsyncSERVER(todoItemID, currentState));
            return;
        });
    };
}

function toggleCompleteActionAsyncSERVER (todoItemID, currentState) {
    return {
        type: SERVER_TOGGLE_TODO_ITEM,
        todoItemID: todoItemID,
        currentState: currentState
    };
}
