var express = require("express");
var trelloRouter = new express.Router();
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
const oauthSecrets = {};

const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");

const login = function (req, res) {
    oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
        oauthSecrets[token] = tokenSecret;
        res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&expiration=1hour`);
    });
};

var callback = function (request, response) {
    const query = url.parse(request.url, true).query;
    const token = query.oauth_token;
    const tokenSecret = oauthSecrets[token];
    const verifier = query.oauth_verifier;
    oauth.getOAuthAccessToken(token, tokenSecret, verifier, function (error, accessToken, accessTokenSecret, results) {
        // In a real app, the accessToken and accessTokenSecret should be stored
        let data = { accessToken: accessToken, accessTokenSecret: accessTokenSecret };
        let urlParameters = Object.keys(data)
            .map(i => `${i}=${data[i]}`)
            .join("&");
        response.redirect(process.env.BASE_URL + urlParameters);
        //response.json();
    });
};

var getUserLists = function (boardsArray, token, secret) {
    let result = [];
    return new Promise((resolve, reject) => {
        boardsArray.map(board => {
            result.push(
                new Promise((resolve1, reject1) => {
                    oauth.getProtectedResource(
                        "https://api.trello.com/1/boards/" + board.id + "/lists",
                        "GET",
                        token,
                        secret,
                        function (error, data, res) {
                            let dataArray = JSON.parse(data);
                            let dataItem = { name: board.name, boardID: board.id, listArray: [] };
                            dataArray.map(list => {
                                dataItem.listArray.push({ name: list.name, id: list.id });
                            });
                            result.push(dataItem);
                            resolve1(dataItem);
                            //console.log(dataItem);
                        }
                    );
                })
            );
        });
        Promise.all(result).then(results => {
            resolve(results);
        });
    });
};

var getUserBoards = function (request, response) {
    oauth.getProtectedResource(
        "https://trello.com/1/members/my/boards",
        "GET",
        request.body.token,
        request.body.secret,
        function (error, data, res) {
            //Now we can respond with data to show that we have access to your Trello account via OAuth
            let dataJSON = JSON.parse(data);
            let boardsArray = [];
            dataJSON.map(board => {
                boardsArray.push({ name: board.name, id: board.id });
            });
            getUserLists(boardsArray, request.body.token, request.body.secret).then(boardsAndLists => {
                response.json(boardsAndLists);
            });
        }
    );
};

/*
/     Routes
*/
trelloRouter.get("/", function (request, response) {
    //response.send("<h1>Oh, hello there!</h1><a href='./login'>Login with OAuth!</a>");
});

trelloRouter.get("/login", function (request, response) {
    login(request, response);
});

trelloRouter.get("/OAuthCallback", function (request, response) {
    callback(request, response);
});

trelloRouter.post("/getBoards", function (request, response) {
    getUserBoards(request, response);
});

module.exports = trelloRouter;
