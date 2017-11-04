import todoListAPI from "../../api/todoList";
import { UPDATE_TITLE } from "./types";

export default function updateTitleAction (todoListID, newTitle) {
    return dispatch => {
        return todoListAPI.updateTitle(todoListID, newTitle).then(res => {
            dispatch(updateTitleActionAsync(todoListID, newTitle));
        });
    };
}

function updateTitleActionAsync (todoListID, newTitle) {
    return {
        type: UPDATE_TITLE,
        todoListID: todoListID,
        newTitle: newTitle
    };
}
