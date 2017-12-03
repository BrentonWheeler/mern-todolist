var KeyGenerator = require("uuid-key-generator");
const keygen = new KeyGenerator(256, KeyGenerator.BASE62);

function doesntExistInDB (Model, cookieKey, callback) {
    Model.findOne({ cookieKey: cookieKey }, (err, doc) => {
        if (doc === null) {
            return callback(cookieKey);
        } else {
            doesntExistInDB(keygen.generateKey(), callback);
        }
    });
}

function createAuthEntry (Model, authEntry) {
    var newTrelloAuth = new Model(authEntry);
    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({ cookieKey: authEntry.cookieKey }, newTrelloAuth, { upsert: true }, (err, doc) => {
            resolve(doc);
        });
    });
}

function getAuthEntryFromCookieKey (Model, cookieKey, callback) {
    console.log("cookie" + cookieKey);
    Model.findOne({ cookieKey: cookieKey }, (err, doc) => {
        if (doc === null) {
            console.log("key not found");
        } else {
            return callback(doc);
        }
    });
}

module.exports = { doesntExistInDB, createAuthEntry, getAuthEntryFromCookieKey };
