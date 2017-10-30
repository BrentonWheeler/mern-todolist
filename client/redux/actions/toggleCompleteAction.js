import todoList from "../../api/todoList";
import { TOGGLE_TODO_ITEM } from "./types";

export default function toggleCompleteAction (todoListID, todoItemID, currentState) {
    return dispatch => {
        return todoList.toggleItem(todoListID, todoItemID, currentState).then(() => {
            dispatch(toggleCompleteActionAsync(todoItemID, currentState));
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
