import todoListAPI from "../../api/todoList";
import { CREATE_TODO_ITEM, SERVER_CREATE_TODO_ITEM } from "./types";

export default function createTodoItemAction (text, todoListID) {
    return dispatch => {
        return todoListAPI.addItem({ text: text, todoListID: todoListID }).then(res => {
            let shortID = res.data.shortID;
            dispatch(createTodoItemActionAsync(text, shortID));
            dispatch(createTodoItemActionToServerAsync(text, todoListID, shortID));
        });
    };
}

function createTodoItemActionAsync (text, shortID) {
    return {
        type: CREATE_TODO_ITEM,
        text: text,
        id: shortID
    };
}

function createTodoItemActionToServerAsync (text, todoListID, shortID) {
    return {
        type: SERVER_CREATE_TODO_ITEM,
        text: text,
        todoListID: todoListID,
        id: shortID
    };
}
