import todoList from "../api/todoList";
import { CREATE_TODO_LIST } from "./types";

export default function createTodoAction () {
    return dispatch => {
        return todoList.create().then(res => {
            let id = res.data.id;
            dispatch(createTodoActionAsync(id));
            return id;
        });
    };
}

function createTodoActionAsync (id) {
    return {
        type: CREATE_TODO_LIST,
        id: id
    };
}
