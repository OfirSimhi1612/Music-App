const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, console.log(`listenning on port ${port}
env:${process.env.NODE_ENV}`));