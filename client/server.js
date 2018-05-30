const express = require('express');
const path = require('path');

var app = express();

app.use(express.static(`${__dirname}/public`));

app.get('*', (req, res) => {

    const fileUrl = path.join(__dirname, 'public/index.html');
    res.sendFile(fileUrl);

});

app.listen(5000);