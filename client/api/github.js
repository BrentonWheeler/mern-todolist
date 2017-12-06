import api from "./api";

let github = {
    getIssues: gitHubAuthKey => api.post("/github/getIssues", { gitHubAuthKey: gitHubAuthKey }),
    createNewTaskList: (gitHubAuthKey, taskListString, selectedIssue) =>
        api.post("/github/createNewTaskList", {
            gitHubAuthKey: gitHubAuthKey,
            taskListString: taskListString,
            selectedIssue: selectedIssue
        }),
    //DOING
    updateTaskList: (gitHubAuthKey, taskListString, updateURL) =>
        api.post("/github/updateTaskList", {
            gitHubAuthKey: gitHubAuthKey,
            taskListString: taskListString,
            updateURL: updateURL
        })
};

export default github;
