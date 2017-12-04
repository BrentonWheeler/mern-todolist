import todoListAPI from "../../api/todoList";
import { UPDATE_GITHUB_UPDATE_URL } from "./types";

export default function updateTitleAction (todoListID, newURL) {
    return dispatch => {
        return todoListAPI.updateGitHubUpdateURL(todoListID, newURL).then(res => {
            dispatch(updateTitleActionAsync(newURL));
        });
    };
}

function updateTitleActionAsync (newURL) {
    return {
        type: UPDATE_GITHUB_UPDATE_URL,
        newTitle: newURL
    };
}
