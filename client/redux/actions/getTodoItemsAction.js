import todoListAPI from "../../api/todoList";
import { SERVER_GET_TODO_ITEMS, GET_TODO_ITEMS } from "./types";

export default function getTodoItemsAction (todoListID) {
    return dispatch => {
        return todoListAPI.getItems(todoListID).then(itemsJSON => {
            let itemArray = itemsJSON.data.itemArray;
            let title = itemsJSON.data.title;
            let github = {
                githubUpdateURL: itemsJSON.data.githubUpdateURL,
                githubAccessURL: itemsJSON.data.githubAccessURL,
                githubLinkOwner: itemsJSON.data.githubLinkOwner
            };
            dispatch(getTodoItemsActionToServerAsync(itemArray, todoListID, title));
            dispatch(getTodoItemsActionAsync(itemArray, todoListID, title, github));
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

function getTodoItemsActionAsync (itemArray, todoListID, title, github) {
    return {
        type: GET_TODO_ITEMS,
        itemArray: itemArray,
        todoListID: todoListID,
        title: title,
        githubUpdateURL: github.githubUpdateURL,
        githubAccessURL: github.githubAccessURL,
        githubLinkOwner: github.githubLinkOwner
    };
}
