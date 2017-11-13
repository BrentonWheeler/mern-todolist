import api from "./api";

let trello = {
    getBoards: (token, secret) => api.post("/trello/getBoards", { token: token, secret: secret }),
    getListItems: (token, secret, todoListID, trelloListID, title) =>
        api.post("/todoList/getListItems", {
            token: token,
            secret: secret,
            todoListID: todoListID,
            trelloListID: trelloListID,
            title: title
        })
};

export default trello;
