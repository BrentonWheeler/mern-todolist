import axios from "axios";
import endpoint from "../api/url";
// let todolist = {
//     create: () =>
//         fetch("/todoList/create", {
//             method: "post",
//             body: 1
//         })
// };
let todolist = {
    create: () => axios.post(endpoint + "/todoList/create"),
    addItem: item => axios.post(endpoint + "/todoList/addItem", item),
    getItems: id => axios.post(endpoint + "/todoList/getItems", { urlID: id })
};

export default todolist;
