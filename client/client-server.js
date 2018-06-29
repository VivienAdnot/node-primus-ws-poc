const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {

    const fileUrl = path.join(__dirname, 'dist/index.html');
    res.sendFile(fileUrl);

});

app.listen(5000);
console.log('primus-poc client should be listening at :5000');