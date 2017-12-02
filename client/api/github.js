import api from "./api";

let github = {
    getIssues: gitHubAuthKey => api.post("/github/getIssues", { gitHubAuthKey: gitHubAuthKey })
};

export default github;
