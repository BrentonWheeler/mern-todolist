import api from "./api";

let trello = {
    getBoards: (token, secret) => api.post("/trello/getBoards", { token: token, secret: secret }),
    getListItems: (token, secret, todoListID, trelloListID) =>
        api.post("/todoList/getListItems", {
            token: token,
            secret: secret,
            todoListID: todoListID,
            trelloListID: trelloListID
        })
};

export default trello;
