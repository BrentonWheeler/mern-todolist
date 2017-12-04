import todoListAPI from "../../api/todoList";
import { UPDATE_GITHUB_LINKS } from "./types";

export default function updateGitHubLinks (todoListID, updateURL, accessURL) {
    return dispatch => {
        return todoListAPI.updateGitHubLinks(todoListID, updateURL, accessURL).then(res => {
            console.log(1);
            dispatch(updateGitHubLinksAsync(updateURL, accessURL));
        });
    };
}

function updateGitHubLinksAsync (updateURL, accessURL) {
    console.log(2);
    return {
        type: UPDATE_GITHUB_LINKS,
        updateURL: updateURL,
        accessURL: accessURL
    };
}
