const express = require("express");
const githubRouter = new express.Router();
const request = require("request");
const queryString = require("query-string");
var GitHub = require("../models/githubAuthModel");
var authHelpers = require("../modules/authHelpers");
var KeyGenerator = require("uuid-key-generator");
const keygen = new KeyGenerator(256, KeyGenerator.BASE62);
/*
/     Routes
*/

githubRouter.get("/login", (req, res) => {
    res.redirect(
        "https://github.com/login/oauth/authorize?client_id=" +
            process.env.GITHUB_CLIENT_ID +
            "&scope=repo&redirect_uri=" +
            process.env.BASE_URL +
            "/github/callback"
    );
});

githubRouter.get("/callback", (req, res) => {
    // Get access token from the code returned in url from github
    let getAccessToken = new Promise((resolve, reject) => {
        request.post(
            "https://github.com/login/oauth/access_token?client_id=" +
                process.env.GITHUB_CLIENT_ID +
                "&redirect_uri=" +
                process.env.BASE_URL +
                "/github/callback&client_secret=" +
                process.env.GITHUB_CLIENT_SECRET +
                "&code=" +
                req.query.code,
            (error, response, body) => {
                body = queryString.parse(body);
                resolve(body.access_token);
            }
        );
    });

    // Store token and secret agaisnt random key, give cookie with that random key to user
    let findNewCookieKey = new Promise((resolve, reject) => {
        authHelpers.doesntExistInDB(GitHub, keygen.generateKey(), resultKey => {
            resolve(resultKey);
        });
    });

    getAccessToken.then(accessToken => {
        findNewCookieKey.then(resultKey => {
            let newGitHubAuth = { cookieKey: resultKey, token: accessToken };
            authHelpers
                .createAuthEntry(GitHub, newGitHubAuth)
                .then(entry => {
                    res.cookie("githubAuth", resultKey);
                    res.status(200);
                    res.redirect(process.env.BASE_URL);
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        });
    });
});

githubRouter.post("/getIssues", (req, res) => {
    // Get users token from cookie key
    new Promise((resolve, reject) => {
        authHelpers.getAuthEntryFromCookieKey(GitHub, req.body.gitHubAuthKey, resultDoc => {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        getUsersIssues(dbEntry.token).then(issueArray => {
            res.json(issueArray);
        });
    });
});

githubRouter.post("/createNewTaskList", (req, res) => {
    // Get users token from cookie key
    new Promise((resolve, reject) => {
        authHelpers.getAuthEntryFromCookieKey(GitHub, req.body.gitHubAuthKey, resultDoc => {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        insertTaskList(dbEntry.token, req.body.taskListString, req.body.selectedIssue).then(body => {
            res.json(body);
        });
    });
});

githubRouter.post("/updateTaskList", (req, res) => {
    // Get users token from cookie key
    new Promise((resolve, reject) => {
        authHelpers.getAuthEntryFromCookieKey(GitHub, req.body.gitHubAuthKey, resultDoc => {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        updateTaskList(dbEntry.token, req.body.taskListString, req.body.updateURL).then(body => {
            res.json(body);
        });
    });
});

githubRouter.post("/getCurrentUser", (req, res) => {
    // Get users token from cookie key
    new Promise((resolve, reject) => {
        authHelpers.getAuthEntryFromCookieKey(GitHub, req.body.gitHubAuthKey, resultDoc => {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        getUser(dbEntry.token).then(login => {
            res.json(login);
        });
    });
});

// Get users issues
function getUser (token) {
    return new Promise((resolve, reject) => {
        request.get(
            {
                url: "https://api.github.com/user",
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick Todo-List"
                }
            },
            (error, response, body) => {
                body = JSON.parse(body);
                resolve(body.login);
            }
        );
    });
}

// Update a linked TaskList
function updateTaskList (token, taskListString, updateURL) {
    return new Promise((resolve, reject) => {
        request.post(
            {
                url: updateURL,
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick Todo-List"
                },
                body: JSON.stringify({
                    body: taskListString
                })
            },
            (error, response, body) => {
                resolve(JSON.parse(body));
            }
        );
    });
}

// Insert TaskList into a new github comment
function insertTaskList (token, taskListString, selectedIssue) {
    return new Promise((resolve, reject) => {
        request.post(
            {
                url:
                    "https://api.github.com/repos/" +
                    selectedIssue.repoFullName +
                    "/issues/" +
                    selectedIssue.number +
                    "/comments",
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick Todo-List"
                },
                body: JSON.stringify({
                    body: taskListString
                })
            },
            (error, response, body) => {
                resolve(JSON.parse(body));
            }
        );
    });
}

// Get users issues
function getUsersIssues (token) {
    let issueArray = [];
    let pageNumber = 1;
    return new Promise((resolve, reject) => {
        function repeatGetUsersIssues (pageNumber) {
            request.get(
                {
                    url: "https://api.github.com/issues?filter=all&sort=updated&per_page=100&page=" + pageNumber,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "User-Agent": "Quick Todo-List"
                    }
                },
                (error, response, body) => {
                    let issuesOnPage = 0;
                    body = JSON.parse(body);
                    body.forEach(issue => {
                        issueArray.push({
                            htmlURL: issue.html_url,
                            number: issue.number,
                            title: issue.title,
                            id: issue.id,
                            repoFullName: issue.repository.full_name,
                            repoOwner: issue.repository.owner.login,
                            repoName: issue.repository.name,
                            repoID: issue.repository.id
                        });
                        issuesOnPage += 1;
                    });

                    if (issuesOnPage < 100) {
                        resolve(issueArray);
                    } else {
                        repeatGetUsersIssues(pageNumber + 1);
                    }
                }
            );
        }
        repeatGetUsersIssues(pageNumber);
    });
}

// Get users watched repos
function getUsersWatchedRepos (token) {
    return new Promise((resolve, reject) => {
        request.get(
            {
                url: "https://api.github.com/user/subscriptions",
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick Todo-List"
                }
            },
            (error, response, body) => {
                let repoArray = [];
                body = JSON.parse(body);

                body.forEach(repo => {
                    repoArray.push({ id: repo.id, name: repo.name, fullName: repo.full_name });
                });
                resolve(repoArray);
            }
        );
    });
}

// Get open issues for a repo
function getReposOpenIssues (token, repo) {
    return new Promise((resolve, reject) => {
        request.get(
            {
                url: "https://api.github.com/repos/" + repo.fullName + "/issues",
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick Todo-List"
                }
            },
            (error, response, body) => {
                body = JSON.parse(body);
                let openIssues = [];
                if (Array.isArray(body)) {
                    body.map(issue => {
                        openIssues.push({
                            htmlURL: issue.html_url,
                            number: issue.number,
                            title: issue.title,
                            id: issue.id
                        });
                    });
                }
                resolve(openIssues);
            }
        );
    });
}

module.exports = githubRouter;
