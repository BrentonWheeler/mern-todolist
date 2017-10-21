import todoList from "../api/todoList";
import { CREATE_TODO_LIST } from "./types";

export default function createTodoAction (history) {
    return dispatch => {
        todoList.create().then(res => {
            let id = res.data.id;
            dispatch(createTodoActionAsync(id));
            history.push("/" + id);
        });
    };
}

function createTodoActionAsync (id) {
    return {
        type: CREATE_TODO_LIST,
        id: id
    };
}
