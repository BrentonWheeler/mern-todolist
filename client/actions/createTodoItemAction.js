//import todoList from "../api/todoList";
import { CREATE_TODO_ITEM } from "./types";

// export const createTodoID = () => dispatch => {
//     todoList
//         .create()
//         .then(function (fromResolve) {
//             id = fromResolve.data.id;
//             console.log(fromResolve.data.id);
//         })
//         .catch(function (fromReject) {
//             console.log(fromReject);
//         });
// };

export default function createTodoItemAction (text) {
    console.log("2: " + text);
    return dispatch => {
        //TODO: backend create item handling
        // todoList.create().then(res => {
        //     let id = res.data.id;
        console.log("3: " + text);
        dispatch(createTodoItemActionAsync(text));
        //});
    };
}

function createTodoItemActionAsync (text) {
    console.log("4: " + text);
    return {
        type: CREATE_TODO_ITEM,
        text: text
    };
}

// export const createTodoAction = () => {
//     console.log("test");
//     return {
//         type: CREATE_TODO
//     };
// };
