var http = require('http');
var fileSystem = require('fs');
var Primus = require('primus');
var lodash = require('lodash');

const WEBSOCKET_PATH = '../../dist/primus.js';

global.sockets = {};

var server = http.createServer(function(req, res) {
    fileSystem.readFile("./index.html", "utf-8", function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var primusInstance = new Primus(server, {
    transformer: 'sockjs'
});

primusInstance.save(WEBSOCKET_PATH, () => {
    primusInstance.on('connection', onConnection.bind(this)),
    primusInstance.on('data', handleMessage.bind(this))
});

const onConnection = (spark) => {

    const { _user, name, client } = spark.query;
    const _spark = spark.id;

    spark.on('data', data => handleMessage(data, spark));

    spark.write('hello connection');

};

const handleMessage = (message, spark) => {

    console.log('message received', message);
}

server.listen(8050);