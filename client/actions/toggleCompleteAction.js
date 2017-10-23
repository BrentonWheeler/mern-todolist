import todoList from "../api/todoList";
import { TOGGLE_TODO_ITEM } from "./types";

export default function toggleCompleteAction (todoListID, todoItemID, currentState) {
    return dispatch => {
        return todoList.toggleItem(todoListID, todoItemID, currentState).then(() => {
            console.log("got here 1");
            dispatch(toggleCompleteActionAsync(todoItemID, currentState));
            console.log("got here 3");
            return;
        });
    };
}

function toggleCompleteActionAsync (todoItemID, currentState) {
    console.log("got here 2");
    return {
        type: TOGGLE_TODO_ITEM,
        todoItemID: todoItemID,
        currentState: currentState
    };
}
