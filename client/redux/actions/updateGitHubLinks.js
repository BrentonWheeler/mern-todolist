import todoListAPI from "../../api/todoList";
import { UPDATE_GITHUB_LINKS } from "./types";

export default function updateGitHubLinks (todoListID, updateURL, accessURL, linkOwner) {
    return dispatch => {
        return todoListAPI.updateGitHubLinks(todoListID, updateURL, accessURL, linkOwner).then(res => {
            dispatch(updateGitHubLinksAsync(updateURL, accessURL, linkOwner));
        });
    };
}

function updateGitHubLinksAsync (updateURL, accessURL, linkOwner) {
    return {
        type: UPDATE_GITHUB_LINKS,
        updateURL: updateURL,
        accessURL: accessURL,
        linkOwner: linkOwner
    };
}
