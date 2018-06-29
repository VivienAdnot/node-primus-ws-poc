
import http from 'http';
import express from 'express';
import Raven from 'raven';
import EventServer from './eventServer';

const app = express();

const sentryUrl = 'https://b722fedddaa648aaaa4146df487e02d0@sentry.io/1200283';

Raven
    .config(sentryUrl, {
        captureUnhandledRejections: true
    })
    .install();

app.use(Raven.requestHandler());

Raven.setContext({
    tags: {
        errorType: 'uncaught'
    }
});
app.use(Raven.errorHandler());

const httpServer = http
    .createServer(app)
    .listen(8050);

console.log('primus-poc server should be listening at :8050');

global.eventServer = new EventServer(httpServer);