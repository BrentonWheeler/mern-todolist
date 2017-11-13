import todoListAPI from "../../api/todoList";
import { SERVER_UPDATE_TITLE } from "./types";

export default function updateTitleAction (todoListID, newTitle) {
    return dispatch => {
        return todoListAPI.updateTitle(todoListID, newTitle).then(res => {
            dispatch(updateTitleActionAsync(todoListID, newTitle));
        });
    };
}

function updateTitleActionAsync (todoListID, newTitle) {
    return {
        type: SERVER_UPDATE_TITLE,
        todoListID: todoListID,
        newTitle: newTitle
    };
}
