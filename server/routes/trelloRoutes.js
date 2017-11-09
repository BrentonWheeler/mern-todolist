var express = require("express");
var trelloRouter = new express.Router();
var http = require("http");
var OAuth = require("oauth").OAuth;
var url = require("url");

/*
/     OAuth Setup and Functions
*/
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Mern Todolist";

const key = process.env.TRELLO_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;

// Trello redirects the user here after authentication
const loginCallback = process.env.BASE_URL + "trello/OAuthCallback";

// You should have {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");

const login = function (req, res) {
    oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
        // console.log(`in getOAuthRequestToken - token: ${token}, tokenSecret: ${tokenSecret}, resultes ${JSON.stringify(results)}, error: ${JSON.stringify(error)}`);
        oauth_secrets[token] = tokenSecret;
        res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}`);
    });
};

var callback = function (request, response) {
    const query = url.parse(request.url, true).query;
    const token = query.oauth_token;
    const tokenSecret = oauth_secrets[token];
    const verifier = query.oauth_verifier;
    oauth.getOAuthAccessToken(token, tokenSecret, verifier, function (error, accessToken, accessTokenSecret, results) {
        // In a real app, the accessToken and accessTokenSecret should be stored
        console.log(
            `in getOAuthAccessToken - accessToken: ${accessToken}, accessTokenSecret: ${accessTokenSecret}, error: ${error}`
        );
        let data = { accessToken: accessToken, accessTokenSecret: accessTokenSecret };
        let urlParameters = Object.keys(data)
            .map(i => `${i}=${data[i]}`)
            .join("&");
        response.redirect(process.env.BASE_URL + urlParameters);
        //response.json();
    });
};

var getUserBoards = function (request, response) {
    // oauth.getProtectedResource(
    //     "https://trello.com/1/members/my/boards",
    //     "GET",
    //     accessToken,
    //     accessTokenSecret,
    //     function (error, data, res) {
    // Now we can respond with data to show that we have access to your Trello account via OAuth
    console.log(request.body);
    //console.log(data)
    //     let dataJSON = JSON.parse(data);
    //     let boardsJSON = [];
    //     dataJSON.map(board => {
    //         boardsJSON.push({ name: board.name, id: board.id });
    //     });
    //     response.send(boardsJSON);
    // }
    //);
};

/*
/     Routes
*/
trelloRouter.get("/", function (request, response) {
    console.log(`GET '/' 🤠 ${Date()}`);
    //response.send("<h1>Oh, hello there!</h1><a href='./login'>Login with OAuth!</a>");
});

trelloRouter.get("/login", function (request, response) {
    console.log(`GET '/login' 🤠 ${Date()}`);
    login(request, response);
});

trelloRouter.get("/OAuthCallback", function (request, response) {
    console.log(`GET '/callback' 🤠 ${Date()}`);
    callback(request, response);
});

trelloRouter.post("/getBoards", function (request, response) {
    console.log(`post '/getBoards' 🤠 ${Date()}`);
    getUserBoards(request, response);
});

module.exports = trelloRouter;
