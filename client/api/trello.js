import api from "./api";

let trello = {
    getBoards: () => api.post("/trello/getBoardsAndLists")
};

export default trello;
