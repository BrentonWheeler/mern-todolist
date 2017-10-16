import axios from "axios";

// export function getTodoListID () {
//     return axios.post("http://localhost:4200/todoList/create");
// }

let todolist = {
    create: () => axios.post("http://localhost:4200/todoList/create")
};

export default todolist;
