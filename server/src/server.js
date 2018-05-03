var http = require('http');
var fileSystem = require('fs');
var Primus = require('primus');
var path = require('path');

const WEBSOCKET_PATH = 'dist/primus.js';
const __root = path.join(__dirname, '../');

// create a write stream (in append mode)
var accessLogStream = fileSystem.createWriteStream(
    `${__root}/socket.log`,
    { flags: 'w' }
);

var server = http.createServer(function(req, res) {
    fileSystem.readFile("./index.html", "utf-8", function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var primus = new Primus(server, {
    transformer: 'sockjs'
});

primus.save(WEBSOCKET_PATH, () => {
    primus.on('connection', onConnection.bind(this)),
    primus.on('data', handleMessage.bind(this))
});

const onConnection = (spark) => {


    const { _user, name, client } = spark.query;
    const _spark = spark.id;

    log(`connection received. spark.query: _user=${_user}, name=${name}, client=${client}, _spark=${_spark}`);

    spark.on('data', data => handleMessage(data, spark));

    spark.write('ping: hello connection');

};

const handleMessage = (message, spark) => {

    log(`message received. data: ${JSON.stringify(message)}, spark: ${JSON.stringify(spark)}`);
}

const log = (message) => {

    console.log(`[socket:server] ${message}`);
    accessLogStream.write(message + '\n');

}

server.listen(8050);