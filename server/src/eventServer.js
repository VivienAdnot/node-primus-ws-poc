import fileSystem from 'fs';
import path from 'path';
import Primus from 'primus';
import addConnection from './Connection/index/connection.model';

const WEBSOCKET_PATH = 'dist/primus.js';
const __root = path.join(__dirname, '../');

// create a write stream (in append mode)
const accessLogStream = fileSystem.createWriteStream(
    `${__root}/socket.log`,
    { flags: 'w' }
);

export default class EventServer {

    constructor(httpServer) {

        global.sockets = {};

        this.primus = new Primus(httpServer, {
            transformer: 'sockjs'
        });

        this.primus.save(WEBSOCKET_PATH, () => {

            this.primus.on('connection', EventServer.onConnection.bind(this));
            this.primus.on('data', EventServer.handleMessage.bind(this));

        });

    }

    static onConnection(spark) {

        const { _user, name, client } = spark.query;
        const _spark = spark.id;

        EventServer.log(`connection received. spark.query: _user=${_user}, name=${name}, client=${client}, _spark=${_spark}`);

        spark.on('data', data => EventServer.handleMessage(data, spark));

        spark.write('ping: hello connection');

        if (global.sockets[_user] === undefined) {

            global.sockets[_user] = {};

        }

        global.sockets[_user][_spark] = spark;

        addConnection({
            type: client,
            _user,
            _spark
        });

    }

    static handleMessage(message, spark) {

        EventServer.log(`message received. data: ${JSON.stringify(message)}, spark: ${JSON.stringify(spark)}`);

    }

    static log(message) {

        console.log(`[socket:server] ${message}`);
        accessLogStream.write(`${message} \n`);

    }

}
