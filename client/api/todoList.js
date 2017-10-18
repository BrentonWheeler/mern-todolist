import axios from "axios";

// let todolist = {
//     create: () =>
//         fetch("/todoList/create", {
//             method: "post",
//             body: 1
//         })
// };
var endpoint = "http://localhost:4200";
console.log(process.env.PRODUCTION);
if (process.env.PRODUCTION === true) {
    console.log("production mode");
    endpoint = "";
}
let todolist = {
    create: () => axios.post(endpoint + "/todoList/create")
};

export default todolist;
