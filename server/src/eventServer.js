import Primus from 'primus';

const WEBSOCKET_PATH = 'dist/primus.js';

export default class EventServer {

    constructor(httpServer) {

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

    }

    static handleMessage(message, spark) {

        EventServer.log(`message received. data: ${JSON.stringify(message)}, spark: ${JSON.stringify(spark)}`);

    }

    static log(message) {

        console.log(`[socket:server] ${message}`);

    }

}
