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
    updateTaskList: (gitHubAuthKey, taskListString, selectedIssue) =>
        api.post("/github/createNewTaskList", {
            gitHubAuthKey: gitHubAuthKey,
            taskListString: taskListString,
            selectedIssue: selectedIssue
        })
};

export default github;
