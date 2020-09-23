const express = require('express');

const app = express()
app.use(express.json());

app.use('/', require('./api'))


module.exports = app;