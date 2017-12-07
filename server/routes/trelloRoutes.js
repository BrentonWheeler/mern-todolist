var express = require("express");
var trelloRouter = new express.Router();
var OAuth = require("oauth").OAuth;
var url = require("url");
var Trello = require("../models/trelloAuthModel");
var KeyGenerator = require("uuid-key-generator");
var authHelpers = require("../modules/authHelpers");

/*
/     OAuth Setup and Functions
*/
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Quick Todo-List";

// Developer API auth
const key = process.env.TRELLO_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;

// Trello redirects the user here after authentication
const loginCallback = process.env.BASE_URL + "/trello/OAuthCallback";
const oauthSecrets = {};
const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");
const keygen = new KeyGenerator(256, KeyGenerator.BASE62);

const login = (req, res) => {
    oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
        oauthSecrets[token] = tokenSecret;
        res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&expiration=1hour`);
    });
};

var callback = (request, response) => {
    const query = url.parse(request.url, true).query;
    const token = query.oauth_token;
    const tokenSecret = oauthSecrets[token];
    const verifier = query.oauth_verifier;
    oauth.getOAuthAccessToken(token, tokenSecret, verifier, (error, accessToken, accessTokenSecret, results) => {
        // Store token and secret agaisnt random key, give cookie with that random key to user
        let findNewCookieKey = new Promise(function (resolve, reject) {
            authHelpers.doesntExistInDB(Trello, keygen.generateKey(), resultKey => {
                resolve(resultKey);
            });
        });
        findNewCookieKey.then(resultKey => {
            let newTrelloAuth = { cookieKey: resultKey, token: accessToken, secret: accessTokenSecret };
            authHelpers
                .createAuthEntry(Trello, newTrelloAuth)
                .then(entry => {
                    response.cookie("trelloAuth", resultKey);
                    response.status(200);
                    response.redirect(process.env.BASE_URL);
                })
                .catch(err => {
                    response.status(400).send("unable to save to database");
                });
        });
    });
};

var getUserLists = (boardsArray, token, secret) => {
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
                        (error, data, res) => {
                            let dataArray = JSON.parse(data);
                            let dataItem = { name: board.name, id: board.id, listArray: [] };
                            dataArray.map(list => {
                                dataItem.listArray.push({ name: list.name, id: list.id });
                            });
                            result.push(dataItem);
                            resolve1(dataItem);
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

var getUserBoards = (request, response) => {
    new Promise((resolve, reject) => {
        authHelpers.getAuthEntryFromCookieKey(Trello, request.body.trelloAuthKey, resultDoc => {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        oauth.getProtectedResource(
            "https://trello.com/1/members/my/boards",
            "GET",
            dbEntry.token,
            dbEntry.secret,
            (error, data, res) => {
                let dataJSON = JSON.parse(data);
                let boardsArray = [];
                dataJSON.map(board => {
                    boardsArray.push({ name: board.name, id: board.id });
                });
                getUserLists(boardsArray, dbEntry.token, dbEntry.secret).then(boardsAndLists => {
                    response.json(boardsAndLists);
                });
            }
        );
    });
};

/*
/     Routes
*/
trelloRouter.get("/", (request, response) => {
    //response.send("<h1>Oh, hello there!</h1><a href='./login'>Login with OAuth!</a>");
});

trelloRouter.get("/login", (request, response) => {
    login(request, response);
});

trelloRouter.get("/OAuthCallback", (request, response) => {
    callback(request, response);
});

trelloRouter.post("/getBoards", (request, response) => {
    getUserBoards(request, response);
});

module.exports = trelloRouter;
