const express = require('express');

const app = express()
app.use(express.json());
app.disable('x-powered-by');

app.use('/', require('./api'))


module.exports = app;