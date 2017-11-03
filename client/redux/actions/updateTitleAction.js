//import todoListAPI from "../../api/todoList";
import { UPDATE_TITLE } from "./types";

export default function updateTitleAction (newTitle) {
    console.log("here");
    return dispatch => {
        //return todoListAPI.updateItemText(todoListID, todoItemID, newText).then(res => {
        dispatch(updateTitleActionAsync(newTitle));
        //});
    };
}

function updateTitleActionAsync (newTitle) {
    return {
        type: UPDATE_TITLE,
        newTitle: newTitle
    };
}
