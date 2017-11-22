import api from "./api";

let trello = {
    getBoards: trelloAuthKey => api.post("/trello/getBoards", { trelloAuthKey: trelloAuthKey }),
    getListItems: (trelloAuthKey, todoListID, trelloListID, title) =>
        api.post("/todoList/getListItems", {
            trelloAuthKey: trelloAuthKey,
            todoListID: todoListID,
            trelloListID: trelloListID,
            title: title
        })
};

export default trello;
