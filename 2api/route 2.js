const app = require('express')();
const { v4 } = require('uuid');


app.get('/api', (req, res) => {
    res.json("hello world");
});

    server.all('*', (req, res) => {
        return handle(req, res);
    });


module.exports = app;
