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

module.exports = githubRouter;
