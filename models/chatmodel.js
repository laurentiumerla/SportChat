var uuid = require("uuid");
// var db = require("../app").bucket;
// var config = require("../config");
// var N1qlQuery = require('couchbase').N1qlQuery;

function ChatModel() { };

ChatModel.create = function (data, callback) {
    var chatMessage = {
        id: uuid.v4(),
        message: data.message,
        createdOn: new Date()
    };
    // db.insert("chat::" + chatMessage.id, chatMessage, function(error, result) {
    //     if(error) {
    //         return callback(error, null);
    //     }
    //     return callback(null, result);
    // });

    return callback(null, chatMessage);
}

ChatModel.getAll = function (callback) {
    // var statement = "SELECT id, message, createdOn " +
    //     "FROM `" + config.couchbase.bucket + "` ORDER BY createdOn ASC";
    // var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    // db.query(query, function (error, result) {
    //     if (error) {
    //         return callback(error, null);
    //     }
    //     callback(null, result);
    // });

    callback(null, {});
};

module.exports = ChatModel;