import todoListAPI from "../../api/todoList";
import { SERVER_GET_TODO_ITEMS, GET_TODO_ITEMS } from "./types";

export default function getTodoItemsAction (todoListID) {
    return dispatch => {
        return todoListAPI.getItems(todoListID).then(itemsJSON => {
            let itemArray = itemsJSON.data.itemArray;
            let title = itemsJSON.data.title;
            let githubUpdateURL = itemsJSON.data.githubUpdateURL;
            let githubAccessURL = itemsJSON.data.githubAccessURL;
            dispatch(getTodoItemsActionToServerAsync(itemArray, todoListID, title));
            dispatch(getTodoItemsActionAsync(itemArray, todoListID, title, githubUpdateURL, githubAccessURL));
            return itemArray;
        });
    };
}

function getTodoItemsActionToServerAsync (itemArray, todoListID, title) {
    return {
        type: SERVER_GET_TODO_ITEMS,
        itemArray: itemArray,
        todoListID: todoListID,
        title: title
    };
}

function getTodoItemsActionAsync (itemArray, todoListID, title, githubUpdateURL, githubAccessURL) {
    return {
        type: GET_TODO_ITEMS,
        itemArray: itemArray,
        todoListID: todoListID,
        title: title,
        githubUpdateURL: githubUpdateURL,
        githubAccessURL: githubAccessURL
    };
}
