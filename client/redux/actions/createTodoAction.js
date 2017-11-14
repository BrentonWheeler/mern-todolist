import todoListAPI from "../../api/todoList";
import { SERVER_CREATE_TODO_LIST } from "./types";

export default function createTodoAction (isImporting) {
    return dispatch => {
        return todoListAPI.create().then(res => {
            let id = res.data.id;
            dispatch(createTodoActionToServerAsync(id, isImporting));
            return id;
        });
    };
}

function createTodoActionToServerAsync (id, isImporting) {
    return {
        type: SERVER_CREATE_TODO_LIST,
        todoListID: id,
        isImporting: isImporting
    };
}
