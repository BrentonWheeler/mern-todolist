const express = require("express");
const githubRouter = new express.Router();
//var url = require("url");
//var GitHub = require("../models/githubAuthModel");
const request = require("request");
const queryString = require("query-string");
//const GitHubApi = require("github");

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
            if (!error && response.statusCode === 200) {
                console.log(error);
            }
            body = queryString.parse(body);
            let accessToken = body.access_token;
        }
    );
    res.send("ayetest");
});

githubRouter.get("/callback123", function (req, res) {
    console.log("123");
    res.send("ayetest1");
});

//var github = new GitHubApi();

// githubRouter.get("/auth", function () {
//     github.authorization.create({
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET
//     });
// });

// github.authorization.create(
//     {
//         scopes: ["user", "public_repo", "repo", "repo:status", "gist"],
//         note: "what this auth is for",
//         note_url: "http://url-to-this-auth-app",
//         headers: {
//             "X-GitHub-OTP": "two-factor-code"
//         },
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET
//     },
//     function (err, res) {
//         if (err) throw err;
//         if (res.token) {
//             console.log(res.token);
//             // save and use res.token as in the Oauth process above from now on
//         }
//     }
// );

// TODO: optional authentication here depending on desired endpoints. See below in README.

// github.users.getFollowingForUser({ username: "defunkt" }, function (err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
// });

module.exports = githubRouter;
