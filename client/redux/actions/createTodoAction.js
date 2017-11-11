import todoListAPI from "../../api/todoList";
import { CREATE_TODO_LIST } from "./types";

export default function createTodoAction (isImporting) {
    return dispatch => {
        return todoListAPI.create().then(res => {
            let id = res.data.id;
            dispatch(createTodoActionAsync(id, isImporting));
            return id;
        });
    };
}

function createTodoActionAsync (id, isImporting) {
    return {
        type: CREATE_TODO_LIST,
        id: id,
        isImporting: isImporting
    };
}
