import api from "./api";

let trello = {
    getBoards: (token, secret) => api.post("/trello/getBoards", { token: token, secret: secret })
};

export default trello;
