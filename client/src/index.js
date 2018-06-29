var websocketHost = "http://localhost:8050/primus";

var _user = "1234";
var name = "vivien";

var primus = new Primus(
    websocketHost + '?_user=' + _user + '&name=' + name + '&client=web',
    {}
);

primus.on('open', function() {
    log('connection established');
});

primus.on('offline', function() {
    log('connection down');
});

primus.on('data', function (message) {
    log('data received ' +  JSON.stringify(message));

    var response = 'pong:' + message;
    primus.write(response);
    log('replied: ' + response);
});

var log = function (message) {

    console.log('[socket:client] ' + message);

};