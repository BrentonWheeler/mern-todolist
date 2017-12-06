import api from "./api";

let todolist = {
    create: () => api.post("/todoList/create"),
    addItem: item => api.post("/todoList/addItem", item),
    deleteItem: (tlID, tiID) => api.post("/todoList/deleteItem", { tlID: tlID, tiID: tiID }),
    toggleItem: (tlID, tiID, currentState) =>
        api.post("/todoList/toggleItem", { tlID: tlID, tiID: tiID, currentState: currentState }),
    updateItemText: (tlID, tiID, newText) =>
        api.post("/todoList/updateItemText", { tlID: tlID, tiID: tiID, newText: newText }),
    getItems: id => api.post("/todoList/getItems", { urlID: id }),
    updateTitle: (tlID, newTitle) => api.post("/todoList/updateTitle", { tlID: tlID, newTitle: newTitle }),
    updateGitHubLinks: (tlID, updateURL, accessURL, linkOwner) =>
        api.post("/todoList/updateGitHubLinks", {
            tlID: tlID,
            updateURL: updateURL,
            accessURL: accessURL,
            linkOwner: linkOwner
        })
};

export default todolist;
