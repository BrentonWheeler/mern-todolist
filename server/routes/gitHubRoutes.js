var express = require("express");
var githubRouter = new express.Router();
//var url = require("url");
//var GitHub = require("../models/githubAuthModel");
var GitHubApi = require("github");

/*
/     Routes
*/

githubRouter.get("/login", function (req, res) {
    res.redirect(
        "https://github.com/login/oauth/authorize?client_id=" +
            process.env.GITHUB_CLIENT_ID +
            "&scope=repo&redirect_uri=http://localhost/github/callback"
    );
});

githubRouter.get("/callback", function (req, res) {
    res.send("ayetest");
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
