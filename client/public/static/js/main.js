var _user = "1234";
var name = "vivien";
var websocketHost = "http://localhost:8050/primus";

var primus = new Primus(
    `${websocketHost}?_user=${_user}&name=${name}&client=web`,
    {}
);

primus.on('open', () => {
    log('connection established');
});

primus.on('offline', () => {
    log('connection down');
});

primus.on('data', (message) => {
    log(`data received ${JSON.stringify(message)}`);

    const response = 'pong:' + message;
    primus.write(response);
    log(`replied: ${response}`);
});

const log = (message) => {

    console.log(`[socket:client] ${message}`);

};