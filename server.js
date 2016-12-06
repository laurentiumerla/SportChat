
////////////////////////////////////////////////////////////
// Creat cu mandrie in Romania - Laurentiu Cristian Merla //
////////////////////////////////////////////////////////////

var express = require("express");
var bodyParser = require("body-parser");
// var couchbase = require("couchbase");
var path = require("path");
// var config = require("./config");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io").listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(__dirname + "/node_modules/"));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var routes = require("./routes/routes.js")(app);
var ChatModel = require("./models/chatmodel.js");
var numUsers = 0;

io.on("connection", function (socket) {
    var addedUser = false;


    socket.on("chat_message", function (msg) {
        console.log(JSON.stringify(msg));
        // ChatModel.create({ message: msg }, function (error, result) {
        //     if (error) {
        //         console.log(JSON.stringify(error));
        //     }
        //     io.emit("chat_message", msg);
        //     // io.emit("chat_message", result);
        // });
        // io.emit("chat_message", msg);
        io.emit('chat_message', {
            username: socket.username,
            message: msg
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add_user', function (username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user_joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user_left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });

});

server.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port %s...", server.address().port);
});