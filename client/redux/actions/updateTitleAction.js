import todoListAPI from "../../api/todoList";
import { UPDATE_TITLE, SERVER_UPDATE_TITLE } from "./types";

export default function updateTitleAction (todoListID, newTitle) {
    return dispatch => {
        return todoListAPI.updateTitle(todoListID, newTitle).then(res => {
            dispatch(updateTitleActionAsync(newTitle));
            dispatch(updateTitleActionToServerAsync(todoListID, newTitle));
        });
    };
}

function updateTitleActionAsync (newTitle) {
    return {
        type: UPDATE_TITLE,
        newTitle: newTitle
    };
}

function updateTitleActionToServerAsync (todoListID, newTitle) {
    return {
        type: SERVER_UPDATE_TITLE,
        todoListID: todoListID,
        newTitle: newTitle
    };
}
