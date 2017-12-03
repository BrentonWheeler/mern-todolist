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

githubRouter.get("/login", function (req, res) {
    res.redirect(
        "https://github.com/login/oauth/authorize?client_id=" +
            process.env.GITHUB_CLIENT_ID +
            "&scope=repo&redirect_uri=" +
            process.env.BASE_URL +
            "/github/callback"
    );
});

githubRouter.get("/callback", function (req, res) {
    // Get access token from the code returned in url from github
    let getAccessToken = new Promise(function (resolve, reject) {
        request.post(
            "https://github.com/login/oauth/access_token?client_id=" +
                process.env.GITHUB_CLIENT_ID +
                "&redirect_uri=" +
                process.env.BASE_URL +
                "/github/callback&client_secret=" +
                process.env.GITHUB_CLIENT_SECRET +
                "&code=" +
                req.query.code,
            function (error, response, body) {
                body = queryString.parse(body);
                resolve(body.access_token);
            }
        );
    });

    // Store token and secret agaisnt random key, give cookie with that random key to user
    let findNewCookieKey = new Promise(function (resolve, reject) {
        authHelpers.doesntExistInDB(GitHub, keygen.generateKey(), function (resultKey) {
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

githubRouter.post("/getIssues", function (req, res) {
    // Get users token from cookie key
    new Promise((resolve, reject) => {
        authHelpers.getAuthEntryFromCookieKey(GitHub, req.body.gitHubAuthKey, function (resultDoc) {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        let issueArray = [];
        getUsersIssues(dbEntry.token, 1, issueArray).then(() => {
            res.json(issueArray);
        });
    });
});

// Get users issues
function getUsersIssues (token, pageNumber, array) {
    return new Promise(function (resolve, reject) {
        function repeatGetUsersIssues (token, pageNumber, array) {
            request.get(
                {
                    url: "https://api.github.com/issues?filter=all&sort=updated&per_page=100&page=" + pageNumber,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "User-Agent": "Quick TodoList"
                    }
                },
                function (error, response, body) {
                    let issuesOnPage = 0;
                    body = JSON.parse(body);
                    body.forEach(issue => {
                        array.push({
                            htmlURL: issue.html_url,
                            number: issue.number,
                            title: issue.title,
                            id: issue.id,
                            repoFullName: issue.repository.full_name,
                            repoName: issue.repository.name,
                            repoID: issue.repository.id
                        });
                        issuesOnPage += 1;
                    });

                    if (issuesOnPage < 100) {
                        resolve();
                    } else {
                        repeatGetUsersIssues(token, pageNumber + 1, array);
                    }
                }
            );
        }
        repeatGetUsersIssues(token, pageNumber, array);
    });
}

// Get users watched repos
function getUsersWatchedRepos (token) {
    return new Promise(function (resolve, reject) {
        request.get(
            {
                url: "https://api.github.com/user/subscriptions",
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick TodoList"
                }
            },
            function (error, response, body) {
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
    return new Promise(function (resolve, reject) {
        request.get(
            {
                url: "https://api.github.com/repos/" + repo.fullName + "/issues",
                headers: {
                    "Authorization": "Bearer " + token,
                    "User-Agent": "Quick TodoList"
                }
            },
            function (error, response, body) {
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
