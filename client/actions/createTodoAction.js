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

export default async function createTodoAction () {
    var id;
    return dispatch => {
        todoList
            .create()
            .then(res => {
                id = res.data.id;
                dispatch(createTodoActionAsync(id));
                console.log("1: " + id);
                return Promise.resolve(id);
            })
            .then(res => {
                console.log("2: " + id);
                return Promise.resolve(id);
            });
        console.log("3: " + id);
        return Promise.resolve(id);
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
