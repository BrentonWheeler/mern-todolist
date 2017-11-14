import todoListAPI from "../../api/todoList";
import { SERVER_CREATE_TODO_ITEM } from "./types";

export default function createTodoItemAction (text, todoListID) {
    return dispatch => {
        return todoListAPI.addItem({ text: text, todoListID: todoListID }).then(res => {
            let shortID = res.data.shortID;
            dispatch(createTodoItemActionToServerAsync(text, todoListID, shortID));
        });
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
