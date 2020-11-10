const app = require('./app');

const port = 8080;

app.listen(port, console.log(`listenning on port ${port}
env:${process.env.NODE_ENV}
`));