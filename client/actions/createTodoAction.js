import todoList from "../api/todoList";
import { CREATE_TODO } from "./types";

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

export default function createTodoAction (history) {
    return dispatch => {
        todoList.create().then(res => {
            let id = res.data.id;
            dispatch(createTodoActionAsync(id));
            history.push("/todoList/" + id);
            console.log("1: " + id);
        });
    };
}

function createTodoActionAsync (id) {
    return {
        type: CREATE_TODO,
        payload: id
    };
}

// export const createTodoAction = () => {
//     console.log("test");
//     return {
//         type: CREATE_TODO
//     };
// };
