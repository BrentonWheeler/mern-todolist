//import todoList from "../api/todoList";
import { CREATE_TODO_ITEM } from "./types";

export default function createTodoItemAction (text, todoListID) {
    return dispatch => {
        //TODO: backend create item handling
        // todoList.create().then(res => {
        //     let id = res.data.id;
        dispatch(createTodoItemActionAsync(text, todoListID));
        //});
    };
}

function createTodoItemActionAsync (text, todoListID) {
    return {
        type: CREATE_TODO_ITEM,
        text: text,
        todoListID: todoListID
    };
}
